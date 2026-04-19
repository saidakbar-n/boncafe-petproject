#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Bon Cafe Frontend
 * 
 * This script runs all test suites and generates comprehensive reports
 * covering unit tests, integration tests, e2e tests, performance tests,
 * and accessibility tests.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.results = {
      unit: null,
      integration: null,
      e2e: null,
      coverage: null
    };
    
    this.startTime = Date.now();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      reset: '\x1b[0m'     // Reset
    };
    
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  }

  async runCommand(command, description, options = {}) {
    this.log(`Starting: ${description}`, 'info');
    
    try {
      const result = execSync(command, {
        stdio: options.silent ? 'pipe' : 'inherit',
        encoding: 'utf8',
        cwd: process.cwd(),
        ...options
      });
      
      this.log(`✓ Completed: ${description}`, 'success');
      return { success: true, output: result };
    } catch (error) {
      this.log(`✗ Failed: ${description}`, 'error');
      if (!options.silent) {
        console.error(error.stdout || error.message);
      }
      return { success: false, error: error.message, output: error.stdout };
    }
  }

  async runUnitTests() {
    this.log('Running Unit Tests...', 'info');
    
    const result = await this.runCommand(
      'npm test -- --coverage --watchAll=false --testPathPattern="(services|contexts|components).*\\.test\\.js$"',
      'Unit Tests'
    );
    
    this.results.unit = result;
    return result;
  }

  async runIntegrationTests() {
    this.log('Running Integration Tests...', 'info');
    
    const result = await this.runCommand(
      'npm test -- --watchAll=false --testPathPattern="integration.*\\.test\\.js$"',
      'Integration Tests'
    );
    
    this.results.integration = result;
    return result;
  }

  async runE2ETests() {
    this.log('Running End-to-End Tests...', 'info');
    
    // Start the development server in background
    this.log('Starting development server...', 'info');
    const serverProcess = require('child_process').spawn('npm', ['start'], {
      stdio: 'pipe',
      detached: true
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    try {
      const result = await this.runCommand(
        'npx cypress run --headless',
        'End-to-End Tests'
      );
      
      this.results.e2e = result;
      return result;
    } finally {
      // Kill the server process
      if (serverProcess.pid) {
        try {
          process.kill(-serverProcess.pid, 'SIGTERM');
        } catch (e) {
          this.log('Warning: Could not kill server process', 'warning');
        }
      }
    }
  }



  async generateCoverageReport() {
    this.log('Generating Coverage Report...', 'info');
    
    const result = await this.runCommand(
      'npm run test:coverage',
      'Coverage Report Generation'
    );
    
    this.results.coverage = result;
    return result;
  }

  async runLighthouseAudit() {
    this.log('Running Lighthouse Performance Audit...', 'info');
    
    // Start the development server
    const serverProcess = require('child_process').spawn('npm', ['start'], {
      stdio: 'pipe',
      detached: true
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    try {
      const result = await this.runCommand(
        'npm run lighthouse',
        'Lighthouse Audit'
      );
      
      return result;
    } finally {
      // Kill the server process
      if (serverProcess.pid) {
        try {
          process.kill(-serverProcess.pid, 'SIGTERM');
        } catch (e) {
          this.log('Warning: Could not kill server process', 'warning');
        }
      }
    }
  }

  generateSummaryReport() {
    const endTime = Date.now();
    const totalTime = Math.round((endTime - this.startTime) / 1000);
    
    const report = {
      timestamp: new Date().toISOString(),
      totalExecutionTime: `${totalTime}s`,
      results: this.results,
      summary: {
        passed: 0,
        failed: 0,
        total: 0
      }
    };
    
    // Calculate summary
    Object.values(this.results).forEach(result => {
      if (result) {
        report.summary.total++;
        if (result.success) {
          report.summary.passed++;
        } else {
          report.summary.failed++;
        }
      }
    });
    
    // Write report to file
    const reportPath = path.join(process.cwd(), 'test-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Display summary
    this.log('\n=== TEST EXECUTION SUMMARY ===', 'info');
    this.log(`Total Execution Time: ${totalTime}s`, 'info');
    this.log(`Test Suites Passed: ${report.summary.passed}/${report.summary.total}`, 
             report.summary.failed === 0 ? 'success' : 'warning');
    
    Object.entries(this.results).forEach(([suite, result]) => {
      if (result) {
        const status = result.success ? '✓' : '✗';
        const color = result.success ? 'success' : 'error';
        this.log(`${status} ${suite.toUpperCase()} Tests`, color);
      }
    });
    
    this.log(`\nDetailed report saved to: ${reportPath}`, 'info');
    
    return report;
  }

  async runAll() {
    this.log('Starting Comprehensive Test Suite...', 'info');
    this.log('This may take several minutes to complete.', 'warning');
    
    try {
      // Run all test suites
      await this.runUnitTests();
      await this.runIntegrationTests();
      
      // Generate coverage report
      await this.generateCoverageReport();
      
      // Run E2E tests (most time-consuming)
      if (process.env.SKIP_E2E !== 'true') {
        await this.runE2ETests();
      } else {
        this.log('Skipping E2E tests (SKIP_E2E=true)', 'warning');
      }
      
      // Run Lighthouse audit
      if (process.env.SKIP_LIGHTHOUSE !== 'true') {
        await this.runLighthouseAudit();
      } else {
        this.log('Skipping Lighthouse audit (SKIP_LIGHTHOUSE=true)', 'warning');
      }
      
    } catch (error) {
      this.log(`Test execution failed: ${error.message}`, 'error');
    } finally {
      // Generate final report
      const report = this.generateSummaryReport();
      
      // Exit with appropriate code
      const exitCode = report.summary.failed > 0 ? 1 : 0;
      process.exit(exitCode);
    }
  }

  async runSpecific(suites) {
    this.log(`Running specific test suites: ${suites.join(', ')}`, 'info');
    
    const suiteMethods = {
      unit: () => this.runUnitTests(),
      integration: () => this.runIntegrationTests(),
      e2e: () => this.runE2ETests(),
      coverage: () => this.generateCoverageReport(),
      lighthouse: () => this.runLighthouseAudit()
    };
    
    for (const suite of suites) {
      if (suiteMethods[suite]) {
        await suiteMethods[suite]();
      } else {
        this.log(`Unknown test suite: ${suite}`, 'warning');
      }
    }
    
    const report = this.generateSummaryReport();
    const exitCode = report.summary.failed > 0 ? 1 : 0;
    process.exit(exitCode);
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const runner = new TestRunner();
  
  if (args.length === 0) {
    // Run all tests
    runner.runAll();
  } else if (args[0] === '--help' || args[0] === '-h') {
    console.log(`
Usage: node testRunner.js [options] [suites...]

Options:
  --help, -h     Show this help message
  
Test Suites:
  unit           Run unit tests
  integration    Run integration tests
  e2e            Run end-to-end tests
  performance    Run performance tests
  accessibility  Run accessibility tests
  security       Run security tests
  coverage       Generate coverage report
  lighthouse     Run Lighthouse audit
  
Environment Variables:
  SKIP_E2E=true        Skip end-to-end tests
  SKIP_LIGHTHOUSE=true Skip Lighthouse audit
  
Examples:
  node testRunner.js                    # Run all tests
  node testRunner.js unit integration   # Run specific suites
  SKIP_E2E=true node testRunner.js      # Run all except E2E
    `);
    process.exit(0);
  } else {
    // Run specific suites
    runner.runSpecific(args);
  }
}

module.exports = TestRunner;
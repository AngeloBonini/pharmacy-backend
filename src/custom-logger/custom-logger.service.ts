import { Logger, QueryRunner } from 'typeorm';

export class CustomLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log(`Query: ${query}`);
    if (parameters) {
      console.log(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.error(`Query Failed: ${query}`);
    console.error(`Error: ${error}`);
    if (parameters) {
      console.error(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.warn(`Query is slow: ${query}`);
    console.warn(`Execution time: ${time}`);
    if (parameters) {
      console.warn(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    console.log(`Schema build: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    console.log(`Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    console.log(`${level}: ${message}`);
  }
}

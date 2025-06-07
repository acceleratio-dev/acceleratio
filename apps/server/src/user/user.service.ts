import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async firstUserCreated() {
    const result = await this.dataSource.query(
      'SELECT * FROM "user" ORDER BY "createdAt" ASC LIMIT 1',
    );
    return result.length > 0;
  }
}

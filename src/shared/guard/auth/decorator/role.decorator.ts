import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const hasRoles = (...hasRoles: number[]) => SetMetadata(ROLES_KEY, hasRoles);

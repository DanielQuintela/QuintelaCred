import { prisma } from "../../lib/prisma"

interface AuditLogParams {
  table_name  : string
  record_id   : string
  action      : 'CREATE' | 'UPDATE' | 'DELETE' | 'UPDATE_STATUS'
  user_id?    : string
  old_values? : any
  new_values? : any
}

export async function createAuditLog(data: AuditLogParams) {
  await prisma.log.create({
    data
  })
}
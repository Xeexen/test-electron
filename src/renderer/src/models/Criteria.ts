export interface Criteria {
  filters: Filter[]
}

export interface Filter {
  column: string
  value: string
  joinTable: string
  operation: 'EQUAL' | 'LIKE' | 'IN' | 'GREATER_THAN' | 'LESS_THAN' | 'BETWEEN' | 'JOIN'
  logicalOperator: 'AND' | 'OR'
}

export interface menu {
  header?: string
  title?: string
  icon?: string
  to?: string
  divider?: boolean
  getURL?: boolean
  chip?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: menu[]
  disabled?: boolean
  type?: string
  subCaption?: string
}

const sidebarItem: menu[] = [
  { header: 'BBF ERP' },
  {
    title: 'Dashboard',
    icon: 'material-symbols:dashboard',
    to: 'home'
  },
  {
    title: 'Clientes',
    icon: 'material-symbols:document-scanner-rounded',
    to: 'dni-documents'
  },
  {
    title: 'Tareas',
    icon: 'hugeicons:task-edit-02',
    to: 'task'
  },
  {
    title: 'Obligaciones',
    icon: 'fluent:task-list-add-24-regular',
    to: 'obligations'
  },
  { header: 'Managment' },
  {
    title: 'Usuarios',
    icon: 'mynaui:users-group',
    to: 'users'
  },
  {
    title: 'Reportes',
    icon: 'iconoir:reports-solid',
    to: 'reports'
  }
]

export default sidebarItem

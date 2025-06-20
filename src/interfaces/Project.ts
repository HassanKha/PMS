export interface Project {
  id: number
  title: string
  status: "Public" | "Private"
  numUsers: number
  numTasks: number
  dateCreated: string
}
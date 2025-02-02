import { supabase } from '@/lib/supabase-client'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects (
    id,
    name,
    slug
  )
`)

export type TasksWithProject = QueryData<typeof tasksWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

/**
 * Fetches a single project from the database by its slug.
 * The result includes all fields of the project and its associated tasks.
 *
 * @param slug - The unique identifier of the project to fetch
 * @returns A single project object with its details and tasks, or null if no project exists
 */
export const projectQuery = (slug: string) => {
  return supabase
    .from('projects')
    .select(
      `
      *,
      tasks (
        id,
        name,
        status,
        due_date
      )
      `,
    )
    .eq('slug', slug)
    .single()
}

export type Project = QueryData<ReturnType<typeof projectQuery>>

/**
 * Fetches a single task from the database with the given id.
 *
 * @param id - The id of the task to fetch
 * @returns A single task object with the given id, or null if no task exists
 */
export const taskQuery = (id: string) => {
  return supabase
    .from('tasks')
    .select(
      `
    *,
    projects (
    id,
    name,
    slug
  )
    `,
    )
    .eq('id', +id)
    .single()
}
export type Task = QueryData<ReturnType<typeof taskQuery>>

/**
 * Fetches a single profile from the database with the given id.
 *
 * @param id - The id of the profile to fetch
 * @returns A single profile object with the given id, or null if no profile exists
 */
export const profileQuery = (id: string) => {
  return supabase.from('profiles').select().eq('id', id).single()
}

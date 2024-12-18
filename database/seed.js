import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

/**
 * Logs an error message to the console and immediately exits the process
 * @param {string} tableName - The name of the table which the error occurred in
 * @param {Error} error - The error that occurred
 */
const logErrorAndExit = (tableName, error) => {
  console.log(`An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`)

  process.exit(1)
}

/**
 * Logs a message to the console for each step of the seeding process
 * @param {string} stepMessage - The message to log
 */
const logStep = (stepMessage) => {
  console.log(`\n${stepMessage}\n`)
}

/**
 * Generates a single project with a name, slug, status, and collaborators.
 * Name: A string of 3 random words.
 * Slug: The name in lowercase with spaces replaced with dashes.
 * Status: A random string which is either 'in-progress' or 'completed'.
 * Collaborators: An array of between 1 and 3 random numbers.
 * @returns {Object} The generated project object.
 */
const createProject = () => {
  const name = faker.lorem.words(3)

  return {
    name,
    slug: name.toLowerCase().replace(/ /g, '-'),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collaborators: faker.helpers.arrayElements([1, 2, 3]),
  }
}

/**
 * Generates an array of project objects with the given number of entries.
 * @param {number} numEntries - The number of entries in the array
 * @returns {Object[]} An array of project objects
 */
const createProjectsArray = (numEntries) => Array.from({ length: numEntries }, createProject)

/**
 * Seeds the projects table with the given number of entries.
 * @param {number} numEntries - The number of entries to seed in the projects table
 * @returns {Object[]} The array of seeded project objects
 */

const seedProjects = async (numEntries) => {
  logStep('Seeding projects...')

  const projectsArray = createProjectsArray(numEntries)

  const { data, error } = await supabase.from('projects').insert(projectsArray).select()

  if (error) return logErrorAndExit('Projects', error)

  logStep(`Projects seeded successfully!`)

  return data
}

/**
 * Generates a single task with a name, status, description, due date, and collaborators.
 * Name: A string of 3 random words.
 * Status: A random string which is either 'in-progress' or 'completed'.
 * Description: A random paragraph.
 * Due date: A random date in the future.
 * Project ID: A random entry from the projectsId array.
 * Collaborators: An array of between 1 and 3 random numbers.
 * @param {number[]} projectsId - The array of project IDs to randomly select from
 * @returns {Object} The generated task object
 */
const createTasks = (projectsId) => ({
  name: faker.lorem.words(3),
  status: faker.helpers.arrayElement(['in-progress', 'completed']),
  description: faker.lorem.paragraph(),
  due_date: faker.date.future(),
  project_id: faker.helpers.arrayElement(projectsId),
  collaborators: faker.helpers.arrayElements([1, 2, 3]),
})

/**
 * Generates an array of task objects with the given number of entries.
 *
 * @param {number} numEntries - The number of entries in the array
 * @param {number[]} projectsId - The array of project IDs to randomly select from
 * @returns {Object[]} An array of task objects
 */
const createTasksArray = (numEntries, projectsId) =>
  Array.from({ length: numEntries }, () => createTasks(projectsId))

/**
 * Seeds the tasks table with the given number of entries.
 * @param {number} numEntriesPerTable - The number of entries to seed in the tasks table
 * @param {number[]} projectsId - The array of project IDs to randomly select from
 * @returns {Object[]} The array of seeded task objects
 */
const seedTasks = async (numEntriesPerTable, projectsIds) => {
  logStep('Seeding tasks...')
  const tasksArray = createTasksArray(numEntriesPerTable, projectsIds)

  const { data, error } = await supabase.from('tasks').insert(tasksArray).select()

  if (error) return logErrorAndExit('Tasks', error)

  logStep(`Tasks seeded successfully!`)

  return data
}

/**
 * Seeds the projects and tasks tables with the given number of entries
 * @param {number} numEntriesPerTable - The number of entries to seed in each table
 */
const seedDatabase = async (numEntriesPerTable) => {
  const projectsIds = (await seedProjects(numEntriesPerTable)).map((project) => project.id)
  seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)

import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const createProject = () => {
  const name = faker.lorem.words(3)

  return {
    name,
    slug: name.toLowerCase().replace(/ /g, '-'),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collaborators: faker.helpers.arrayElements([1, 2, 3]),
  }
}

const createProjectsArray = (numberOfProjects = 1) =>
  Array.from({ length: numberOfProjects }, createProject)

const seedProjects = async (arrayLength = 1) => {
  const projectsArray = createProjectsArray(arrayLength)

  const { error } = await supabase.from('projects').insert(projectsArray)

  if (error) {
    console.error(`Error: ${error}`)
  }
}

await seedProjects(10)

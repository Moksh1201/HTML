import { faker } from '@faker-js/faker';

const stafflist = [
    {
        Artvalu: faker.image.animals(),
        book: faker.company.name(),
        name: "4.9  "+faker.name.firstName() + " "+ faker.name.firstName(),
        description: "React"
    },
    {
        Artvalu: faker.image.business(),
        book: faker.company.name(),
        name: "4.3  "+faker.name.firstName() + " "+ faker.name.firstName(),
        description: "Vue"
    },
    {
        Artvalu: faker.image.food(),
        book: faker.company.name(),
        name:"4.8  "+ faker.name.firstName() + " "+ faker.name.firstName(),
        description: "HTML"
    }
]

export default stafflist
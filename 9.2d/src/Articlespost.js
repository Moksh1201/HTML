import { faker } from '@faker-js/faker';

const stafflist = [
    {
        Artvalu: faker.image.city(),
        book: faker.company.name(),
        name: "4.5  "+faker.name.firstName() + " "+ faker.name.firstName(),
        description: "JS6"
    },
    {
        Artvalu: faker.image.abstract(),
        book: faker.company.name(),
        name: "5.0  "+faker.name.firstName() + " "+ faker.name.firstName(),
        description: "React Router"
    },
    {
        Artvalu: faker.image.cats(),
        book: faker.company.name(),
        name: "4.7  "+faker.name.firstName() + " "+ faker.name.firstName(),
        description: "Express"
    }
]

export default stafflist
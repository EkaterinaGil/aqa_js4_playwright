type TableRow = Record<string, string>;

const testData: TableRow[] = [
    {
        "Last Name": "Doe",
        "First Name": "John",
        "Email": "john.doe@example.com",
        "Salary": "$55,000",
        "Age": "29",
        "Occupation": "AQA Engineer"
    },
    {
        "Last Name": "Smith",
        "First Name": "Sarah",
        "Email": "sarah.smith@example.com",
        "Salary": "$72,000",
        "Age": "34",
        "Occupation": "Frontend Developer"
    },
    {
        "Last Name": "Johnson",
        "First Name": "Alex",
        "Email": "alex.johnson@example.com",
        "Salary": "$64,000",
        "Age": "31",
        "Occupation": "Backend Developer"
    },
    {
        "Last Name": "Williams",
        "First Name": "Linda",
        "Email": "linda.williams@example.com",
        "Salary": "$48,000",
        "Age": "26",
        "Occupation": "Manual Tester"
    },
    {
        "Last Name": "Brown",
        "First Name": "Michael",
        "Email": "michael.brown@example.com",
        "Salary": "$89,000",
        "Age": "41",
        "Occupation": "Team Lead"
    },
];

export default testData;
export type { TableRow };
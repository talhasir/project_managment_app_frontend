// import { data } from "autoprefixer";
// import { columns } from "../Component Api Variables/ProjectsTableVars";
import PageComponent from "../Layouts/ViewLayout";
import { Button, Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'IMAGE',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'STATUS',
    key: 'status',
    dataIndex: 'status',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'CREATE DATE',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'DUE DATE',
    dataIndex: 'due_date',
    key: 'due_date',
  },
  {
    title: 'CREATED BY',
    dataIndex: 'created_by',
    key: 'created_by',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size="small">Edit</Button>
        <Button type="primary" danger size="small">Delete</Button>
        {/* <a className="text-red-600 hover:text-red-300 hover:ring-offset-2 ring-2 ring-red-300 rounded px-3 py-1">Delete</a> */}
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function Projects(props) {
  return (
    <>
      <PageComponent heading="Projects">
        <div>
        <Table bordered color columns={columns} dataSource={data} />
        </div>
      </PageComponent>
    </>
  );
}

export default Projects;

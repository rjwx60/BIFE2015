// mainObj -> taskList -> tasks
var dataObj = [
  /** mainObject */
  {
    id: 1,
    title: "默认分类",
    actived: true,
    taskList: [
      /** taskList */      
      {
        id: 2,
        listName: 'task1',
        incomplete: 2,
        actived: true,
        tasks: [
          {
            id: 3,
            title: 'to-do-1',
            createDate: 'Tue May 14 2019 08:20:15',
            substance: '完成。。。。的任务1', 
            status: false,
            actived: true,
            disabled: false,
          },
          {
            id: 4,
            title: 'to-do-2',
            createDate: 'Tue May 14 2019 09:20:15',
            substance: '完成。。。。的任务2', 
            status: false,
            actived: false,
            disabled: false,
          },
          {
            id: 5,
            title: 'to-do-3',
            createDate: 'Tue May 14 2019 10:20:15',
            substance: '完成。。。。的任务3', 
            status: false,
            actived: false,
            disabled: false,
          }
        ]
      },
      {
        listName: 'task1',
        incomplete: 1,
        actived: false,
        id: 6,
        tasks: [
          {
            id: 7,
            title: 'to-do-99',
            createDate: 'Tue May 14 2019 08:20:15',
            substance: '完成。。。。的任务99', 
            status: false,
            actived: false,
            disabled: false,
          },
        ]
      }
    ]
  },
  {
    title: "BIFE项目",
    actived: false,
    id: 8,
    taskList: [
      {
        listName: 'task11',
        incomplete: 1,
        actived: false,
        id: 9,
        tasks: [
          {
            id: 10,
            title: 'to-do-11',
            createDate: 'Tue May 14 2019 11:20:15',
            substance: '完成。。。。的任务11', 
            status: false,
            actived: false,
            disabled: false,
          },
          {
            id: 11,
            title: 'to-do-22',
            createDate: 'Tue May 14 2019 12:20:15',
            substance: '完成。。。。的任务22', 
            status: false,
            actived: false,
            disabled: false,
          },
        ]
      }
    ]
  }
];

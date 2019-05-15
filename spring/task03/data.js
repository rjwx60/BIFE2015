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
            editDate: '2019-05-14',
            finishDate: '',
            substance: '完成。。。。的任务1', 
            status: false,
            actived: true,
            readonly: true,
          },
          {
            id: 4,
            title: 'to-do-2',
            editDate: '2019-05-15',
            finishDate: '',
            substance: '完成。。。。的任务2', 
            status: false,
            actived: false,
            readonly: true,
          },
          {
            id: 5,
            title: 'to-do-3',
            editDate: '2019-05-16',
            finishDate: '',
            substance: '完成。。。。的任务3', 
            status: false,
            actived: false,
            readonly: true,
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
            editDate: '2019-05-16',
            finishDate: '',
            substance: '完成。。。。的任务99', 
            status: false,
            actived: false,
            readonly: true,
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
            editDate: '2019-05-16',
            finishDate: '',
            substance: '完成。。。。的任务11', 
            status: false,
            actived: false,
            readonly: true,
          },
          {
            id: 11,
            title: 'to-do-22',
            editDate: '2019-05-16',
            finishDate: '',
            substance: '完成。。。。的任务22', 
            status: false,
            actived: false,
            readonly: true,
          },
        ]
      }
    ]
  }
];

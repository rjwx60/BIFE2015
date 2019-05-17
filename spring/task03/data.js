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
            editDate: '2019-05-15',
            finishDate: '',
            substance: '完成。。。。的任务1', 
            status: false,
            actived: true,
            extra: false,
            readonly: true,
          },
          {
            id: 20,
            title: 'to-do-20',
            editDate: '2019-05-15',
            finishDate: '',
            substance: '完成。。。。的任务20', 
            status: false,
            actived: false,
            extra: false,
            readonly: true,
          },
          {
            id: 21,
            title: 'to-do-21',
            editDate: '2019-05-15',
            finishDate: '',
            substance: '完成。。。。的任务21', 
            status: false,
            actived: false,
            extra: false,
            readonly: true,
          },
          {
            id: 4,
            title: 'to-do-2',
            editDate: '2018-05-20',
            finishDate: '',
            substance: '完成。。。。的任务2', 
            status: false,
            actived: false,
            extra: false,
            readonly: true,
          },
          {
            id: 22,
            title: 'to-do-22',
            editDate: '2018-05-20',
            finishDate: '',
            substance: '完成。。。。的任务22', 
            status: false,
            actived: false,
            extra: false,
            readonly: true,
          },
          {
            id: 23,
            title: 'to-do-23',
            editDate: '2018-05-20',
            finishDate: '',
            substance: '完成。。。。的任务23', 
            status: false,
            actived: false,
            extra: false,
            readonly: true,
          },
          {
            id: 5,
            title: 'to-do-3',
            editDate: '2019-06-15',
            finishDate: '',
            substance: '完成。。。。的任务3', 
            status: false,
            actived: false,
            extra: false,
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
            extra: false,
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
            extra: false,
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
            extra: false,
            readonly: true,
          },
        ]
      }
    ]
  }
];


export default class AppService {
    getPages() {
        return [
            {
              id: 11,
              name: "Left",
              data: [{id: 1, name: 'Left 1'},{id: 2, name: 'Left 2'},{id: 3, name: 'Left 3'}]
            },
            {
              id: 22,
              name: "Middle",
              data: [{id: 4, name: 'Middle 1'},{id: 5, name: 'Middle 2'}, {id: 6, name: 'Middle 3'}]
            },
            {
              id: 33,
              name: "Right",
              data: [{id: 7, name: 'Right 1'},{id: 8, name: 'Right 2'},{id: 9, name: 'Right 3'}]
            },
          ];
    }
}
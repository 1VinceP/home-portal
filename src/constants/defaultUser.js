export default () => ({
  name: '',
  password: '',
  image: '',
  admin: false,
  manager: false,
  child: true,
  tasks: [],
  rewards: [],
  events: [],
  points: 0,
  permissions: {
    ownName: false,
    ownPassword: false,
    ownImage: false,
    ownSettings: false,
    otherName: false,
    otherPassword: false,
    otherPoints: false,
    assignTask: false,
    assignEvent: false,
    createTask: false,
    editTask: false,
    editEvent: false,
    editReward: false,
    createRecipe: false,
    editRecipe: false,
  },
  accountSettings: {},
});

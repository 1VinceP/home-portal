

## User Stories
### (1.0) Logging in
<!--
- [x] (1.1) `Create a new Family Account`
  - [x] Create an account and save to db
  - [x] New user flow
    - [x] Redirect to Family page
      - [x] Without bugs
      - [x] Nav/Header shown, Nav links disabled
      - [x] Nav links still protected
    - [x] Create first admin user (see "(1.3) Family detail page")
    - [x] Receive access to all account pages
  - [x] Enhancements
    - [x] email/password validation
    - [x] Login page styles
-->

- [x] (1.2) `Login to an existing account`
  - [x] Account has no users
    - [x] New user flow (see "(1.1) Create a new family account")
  - [x] Account has users
    - [x] Immediately load all users with permissions
      - [x] Top level
      - [x] Permissions
    - [x] Redirect to Family page
      - [x] Select user and login
      - [x] Redirect to Dashboard

- [ ] (1.3) `Family detail page`
  - [ ] Display/edit current user data
    - [ ] Child user can maybe edit self
    - [ ] Delete user
  - [x] Create User
  - [x] Display list of users
  - [ ] Display/edit other user data
    - [ ] Admin/manager/child permissions
      - [ ] Admin can edit all
      - [ ] Manager can edit some
      - [ ] Child can maybe edit self
  - [ ] Mobile friendly

### 2.0 Tasks
- [ ] (2.1) `Display tasks`
  - [ ] Get all tasks by user
    - [ ] Display user tasks on Family page
  - [ ] Display all tasks on Tasks page

- [ ] (2.2) `REST tasks`
  - [ ] Create tasks
  - [ ] Edit tasks
  - [ ] Delete tasks



## Permissions
### Family
| Property      | Admin | Manager | Child |
| ------------- | ----- | ------- | ----- |
| Edit family   | true  | false   | false |
| Delete family | true  | false   | false |

### User
| Property          | Admin | Manager                                                 | Child                                                   |
| ----------------- | ----- | ------------------------------------------------------- | ------------------------------------------------------- |
| Create User       | true  | false                                                   | false                                                   |
| Read self         | true  | (name, image, tasks, rewards, events, points, settings) | (name, image, tasks, rewards, events, points, settings) |
| Read other user   | true  | (name, tasks, events, (Child): points with permission)  | (name, tasks, events)                                   |
| Edit Self         | true  | (name, password, image, account settings)               | (name, account settings)                                |
| Edit other user   | true  | false, ((child): name, add points)                      | false                                                   |
| Delete other user | true  | false                                                   | false                                                   |

### Task
| Property    | Admin | Manager            | Child              |
| ----------- | ----- | ------------------ | ------------------ |
| Create task | true  | with permission    | false              |
| Read task   | true  | true (except meta) | true (except meta) |
| Edit task   | true  | with permission    | false              |
| Assign task | true  | with permission    | false              |
| Delete task | true  | false              | false              |

### Reward
| Property      | Admin | Manager            | Child              |
| ------------- | ----- | ------------------ | ------------------ |
| Create reward | true  | false              | false              |
| Read reward   | true  | true (except meta) | true (except meta) |
| Edit reward   | true  | with permission    | false              |
| Delete reward | true  | false              | false              |

### Event
| Property        | Admin | Manager                                | Child                 |
| --------------- | ----- | -------------------------------------- | --------------------- |
| Create event    | true  | true                                   | false                 |
| Edit event      | true  | with permission                        | false                 |
| Assign event    | true  | with permission                        | false                 |
| Delete event    | true  | false                                  | false                 |
| Read event      | true  | true (except meta)                     | true (except meta)    |
| Read other user | true  | (name, tasks, events, (Child): points) | (name, tasks, events) |

### Recipe
| Property      | Admin | Manager | Child              |
| ------------- | ----- | ------- | ------------------ |
| Create recipe | true  | true    | with permission    |
| Read recipe   | true  | true    | true (except meta) |
| Edit recipe   | true  | true    | false              |
| Assign recipe | true  | true    | false              |
| Delete recipe | true  | true    | false              |

## Structures
### Family
```ts
{
  name: String,
  users: Array,
  tasks: Array,
  rewards: Array,
  events: Array,
  settings: Array, // global family settings set by Admin
  meta: {
    createdOn: Date,
    createdBy: String, // relates to a userId
    history: Array, // log of changes
  },
};
```

### User
```ts
{
  name: String,
  password: String,
  image: String,
  admin: Boolean,
  manager: Boolean,
  child: Function, // if not admin or manager
  tasks: Array, // list of assigned tasks
  rewards: Array, // list of purchased rewards
  events: Array, // list of calendar events related to this user
  points: Number, // quantity of accumulated points
  permissions: { // only modifiable by Admin
    canEditSelf: Array, // list of own properties this user can edit
    canEditChild: Array, // list of child user properties this user can edit
  },
  accountSettings: Object,
  meta: {
    createdOn: Date,
    createdBy: String, // relates to userId
    history: Array, // log of changes
  },
};
```

### Task
```ts
{
  name: String,
  description: String,
  image: String,
  repeats?: {
    frequency: String, // daily, every x days, weekly, biweekly, monthly, every x months
    dayNumber: Number,
  },
  dueDate?: Date,
  notificationTime?: Date,
  reward: Number,
  meta: {
    createdOn: Date,
    createdBy: String, // relates to userId
    history: Array, // log of changes
  },
};
```

### Reward
```ts
{
  name: String,
  description: String,
  image: String,
  expiration?: Date,
  cost: Number,
};
```

### Event
```ts
{
  name: String,
  description: String,
  image: String,
  participants?: Array, // users other than assignee
  repeats?: {
    frequency: String, // daily, every x days, weekly, biweekly, monthly, every x months
    dayNumber: Number,
  },
  startTime: Date,
  endTime: Date,
  reward?: Number,
  meta: {
    createdOn: Date,
    createdBy: String, // relates to userId
    history: Array, // log of changes
  },
};
```

### Recipe
```ts
{
  name: String,
  description: String,
  image: String,
  url: String,
  ingredients: [{
    name: String,
    quantity: String,
    owned: Boolean, // only applicable if meal is scheduled
    substitutes: {
      name: String,
      quantity: String,
      owned?: Boolean, // only applicable if meal is scheduled
    },
  }],
  scheduledFor: Date,
  shoppingList: Array[{ ingredients.name, ingredients.quantity, owned: Boolean }], // only applicable if meal is scheduled
  meta: {
    createdOn: Date,
    createdBy: String, // relates to userId
    history: Array, // log of changes
  },
};
```

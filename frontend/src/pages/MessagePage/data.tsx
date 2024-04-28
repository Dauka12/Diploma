import { ChatProps, UserProps } from './types';

export const users: UserProps[] = [
  {
    name: 'Dastan E.',
    username: '@DastanI',
    avatar: '/static/images/avatar/2.jpg',
    online: true,
  },
  {
    name: 'Dina Askarove',
    username: '@dina',
    avatar: '/static/images/avatar/3.jpg',
    online: false,
  },
  {
    name: 'Temirlan B',
    username: '@phoenix',
    avatar: '/static/images/avatar/1.jpg',
    online: true,
  },
  {
    name: 'Madina VIP',
    username: '@eleanor',
    avatar: '/static/images/avatar/4.jpg',
    online: false,
  },
  {
    name: 'Sergei Pavlovich',
    username: '@ser',
    avatar: '/static/images/avatar/5.jpg',
    online: true,
  },
  {
    name: 'Dmitri Bivol',
    username: '@DB',
    avatar: '/static/images/avatar/6.jpg',
    online: true,
  },
  {
    name: 'Mikhail',
    username: '@melissa',
    avatar: '/static/images/avatar/7.jpg',
    online: false,
  },
];

export const chats: ChatProps[] = [
  {
    id: '1',
    sender: users[0],
    messages: [
      {
        id: '1',
        content: 'Hi ',
        timestamp: 'Wednesday 9:00am',
        sender: users[0],
      },
      {
        id: '2',
        content: 'That ',
        timestamp: 'Wednesday 9:10am',
        sender: 'You',
      },
      {
        id: '3',
        timestamp: 'Wednesday 11:30am',
        sender: users[0],
        content: 'f the day.',
      },
      {
        id: '4',
        timestamp: 'Wednesday 2:00pm',
        sender: 'You',
        content: ' for it.',
      },
      {
        id: '5',
        timestamp: 'Wednesday 4:30pm',
        sender: users[0],
        content: ' the draft.',
      },
      {
        id: '6',
        content:
          " work on making ",
        timestamp: 'Thursday 10:16am',
        sender: users[0],
      },
      {
        id: '7',
        content:
          "notes in ",
        timestamp: 'Thursday 11:40am',
        sender: users[0],
      },
      {
        id: '7',
        content:
          "notes in ",
        timestamp: 'Thursday 11:40am',
        sender: users[0],
      },
      {
        id: '8',
        timestamp: 'Thursday 11:41am',
        sender: 'You',
        content: " this today.",
      },
      {
        id: '9',
        timestamp: 'Thursday 11:44am',
        sender: users[0],
        content: "still have to wait",
      },
      {
        id: '10',
        timestamp: 'Today 2:20pm',
        sender: users[0],
        content: 'Hey you can?',
      },
      {
        id: '11',
        timestamp: 'Just now',
        sender: 'You',
        content: " They're !",
      },
    ],
  },
  {
    id: '2',
    sender: users[1],
    messages: [
      {
        id: '1',
        content: 'Hi ',
        timestamp: 'Wednesday 9:00am',
        sender: users[1],
      },
      {
        id: '2',
        content:
          'That ?',
        timestamp: 'Wednesday 9:05am',
        sender: 'You',
      },
      {
        id: '3',
        content: 'I am .',
        timestamp: 'Wednesday 9:30am',
        sender: users[1],
      },
      {
        id: '4',
        content: 'time of year!',
        timestamp: 'Wednesday 9:35am',
        sender: 'You',
      },
      {
        id: '5',
        content: ' break.',
        timestamp: 'Wednesday 10:00am',
        sender: users[1],
      },
      {
        id: '6',
        content: 'Make pictures!',
        timestamp: 'Wednesday 10:05am',
        sender: 'You',
      },
    ],
  },
  {
    id: '3',
    sender: users[2],
    messages: [
      {
        id: '1',
        content: 'Hey!',
        timestamp: '5 mins ago',
        sender: users[2],
        unread: true,
      },
    ],
  },
  {
    id: '4',
    sender: users[3],
    messages: [
      {
        id: '1',
        content:
          'Hey work.',
        timestamp: 'Wednesday 9:00am',
        sender: users[3],
      },
      {
        id: '2',
        content:
          'That ering?',
        timestamp: 'Wednesday 9:05am',
        sender: 'You',
      },
      {
        id: '3',
        content: 'I am planning  furniture.',
        timestamp: 'Wednesday 9:15am',
        sender: users[3],
      },
      {
        id: '4',
        content:
          'That ?',
        timestamp: 'Wednesday 9:20am',
        sender: 'You',
      },
      {
        id: '5',
        content:
          'I mig over the weekend?',
        timestamp: 'Wednesday 9:30am',
        sender: users[3],
      },
    ],
  },

  {
    id: '5',
    sender: users[4],
    messages: [
      {
        id: '1',
        content: 'Sup',
        timestamp: '5 mins ago',
        sender: users[4],
        unread: true,
      },
    ],
  },
  {
    id: '6',
    sender: users[5],
    messages: [
      {
        id: '1',
        content: 'Heyo',
        timestamp: '5 mins ago',
        sender: 'You',
        unread: true,
      },
    ],
  },

  {
    id: '7',
    sender: users[6],
    messages: [
      {
        id: '1',
        content:
          "Hey O Phoenix to look over.",
        timestamp: '5 mins ago',
        sender: users[6],
        unread: true,
      },
    ],
  },
];
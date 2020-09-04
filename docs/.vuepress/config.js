const { description } = require('../../package');

module.exports = {
  title: 'Tomon 开发者中心',
  description: description,
  head: [
    ['link', { rel: 'icon', href: '/assets/logo.png' }],
    ['link', { rel: 'shortcut icon', href: '/assets/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
  ],
  themeConfig: {
    repo: 'tomon-world/tomon-docs',
    logo: '/assets/logo.png',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在GitHub上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      {
        text: '概览',
        link: '/overview/',
      },
      {
        text: '参考',
        link: '/reference/',
      },
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: '高级',
        link: '/advanced/',
      },
      {
        text: 'Tomon Bot World',
        link: 'https://beta.tomon.co/invite/x3RMui',
      },
    ],
    sidebar: {
      '/overview/': getOverviewSidebar(),
      '/reference/': getReferenceSidebar(),
      '/guide/': getGuideSidebar(),
      '/advanced/': getAdvancedSidebar(),
    },
  },
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};

function getOverviewSidebar() {
  return [
    {
      title: '概览',
      collapsable: false,
      children: ['', 'rest-api', 'auth', 'resource-id', 'connect', 'sdk'],
    },
  ];
}

function getReferenceSidebar() {
  return [
    {
      title: '参考',
      collapsable: false,
      children: [
        '',
        'user',
        'guild',
        'channel',
        'role',
        'emoji',
        'message',
        'forward',
        'stamp',
        'invite',
        'voice',
      ],
    },
  ];
}

function getGuideSidebar() {
  return [
    {
      title: '指南',
      collapsable: false,
      children: ['', 'send-message', 'send-image'],
    },
  ];
}

function getAdvancedSidebar() {
  return [
    {
      title: '进阶',
      collapsable: false,
      children: ['', 'socket', 'permissions', 'structure'],
    },
    // {
    //   title: '数据定义',
    //   collapsable: false,
    //   children: ['structure'],
    //   initialOpenGroupIndex: -1,
    // },
  ];
}

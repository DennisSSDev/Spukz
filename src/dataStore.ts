import fs from 'fs';
import { Global, Resource, Type, Tag } from './dataTypes';

const GLOBAL: Global = {
  store: { resources: [] },
  iconMap: {
    GitHub: '',
    YouTube: '',
    GDCVault: ''
  }
};

export const GenContent = () => {
  // todo: verify the names and extensions are correct
  const ytIcon = fs.readFileSync(`${__dirname}/meta/ytIcon.png`);
  const ghIcon = fs.readFileSync(`${__dirname}/meta/ghIcon.svg`);
  const gdcVIcon = fs.readFileSync(`${__dirname}/meta/gdcVIcon.png`);
  const yt64 = Buffer.from(ytIcon).toString('base64');
  const gh64 = Buffer.from(ghIcon).toString('base64');
  const gdcV64 = Buffer.from(gdcVIcon).toString('base64');
  const curatedYouTubeContent: Resource[] = [
    {
      type: Type.YouTube,
      link: 'https://youtu.be/sMkMr2455mk',
      icon: yt64,
      description:
        "I've created a study plan to help anyone succeed in a programming interview! I've compiled it using my own interviewing experiences at tech companies in Silicon Valley, the experiences of my friends who currently work at Big N tech companies",
      tags: [Tag['C++']]
    },
    {
      type: Type.YouTube,
      link: 'https://youtu.be/tBO-RvTPETU',
      icon: yt64,
      description:
        "Want to get a job as a game developer?  I'll tell you everything I know about getting hired for your first position, how to get through the application and interview process, and what to do once you're there.",
      tags: [Tag.Unity]
    },
    {
      type: Type.YouTube,
      link: 'https://youtu.be/cV5HArLYajE',
      icon: yt64,
      description:
        "Unity's Mike Acton presents some broad, sweeping, and perhaps unfair generalizations about programmers in the video industry, and discusses what it would mean to be among the very best programmers in the field.",
      tags: [Tag.Unity, Tag.Vault, Tag['C++']]
    }
  ];

  const curatedGithubContent: Resource[] = [
    {
      type: Type.GitHub,
      link: 'https://github.com/nujas/TheJanusFramework',
      icon: gh64,
      description:
        'An Unreal Engine powered framework designed to bootstrap ARPG games with a mid-large open world setting. Creators of this FW have gone to intern at WB Games and Twitch',
      tags: [Tag.GitHub, Tag['C++'], Tag.Unreal]
    },
    {
      type: Type.GitHub,
      link: 'https://github.com/EthanNichols/DXCentsEngine',
      icon: gh64,
      description:
        'A "student made" game engine in DX11 with C++ that has landed the student an internship opportunity at Activision',
      tags: [Tag.GitHub, Tag['C++']]
    }
  ];
  const curatedGDCVaultContent: Resource[] = [
    {
      type: Type.GDCVault,
      link: 'https://www.gdcvault.com/play/1015086',
      icon: gdcV64,
      description:
        'Want to learn how to make every mistake in the book when applying for a job? Interested in understanding what it takes to make a poor or unmemorable first impression? Join industry Hiring Managers Lindsey McQueeney and Dino McGraw as they offer advice to, real-world examples of the common pitfalls and mistakes candidates make when applying for a game development position.',
      tags: [Tag.Vault]
    }
  ];
  GLOBAL.store.resources = GLOBAL.store.resources.concat(
    curatedGDCVaultContent,
    curatedGithubContent,
    curatedYouTubeContent
  );
  GLOBAL.iconMap.GDCVault = gdcV64;
  GLOBAL.iconMap.GitHub = gh64;
  GLOBAL.iconMap.YouTube = yt64;
};

export const AddNewResource = (res: Resource): number => {
  let status = 201;
  let update = false;
  let i = -1;
  GLOBAL.store.resources.map((value, index) => {
    if (value.link === res.link) {
      status = 204;
      update = true;
      i = index;
    }
    return value;
  });
  if (!update) {
    GLOBAL.store.resources.push(res);
  } else {
    GLOBAL.store.resources[i] = res;
  }
  return status;
};

// both params inclusive
// if the end overflows - range would go to the last element
export const GetResources = (
  start: number,
  end: number
): { resources: Resource[]; done: boolean } => {
  const { resources } = GLOBAL.store;
  const { length } = resources;
  const result: { resources: Resource[]; done: boolean } = {
    resources: [],
    done: false
  };
  if (start > length || start < 0) {
    throw new Error('RangeOverflow');
  }
  if (end < start || end < 0) {
    throw new Error('RangeOverflow');
  }
  if (start === end) {
    result.resources.push(resources[start]);
    return result;
  }
  if (length - end < 0) {
    result.resources = resources.slice(0, length - start);
    result.done = true;
    result.resources.reverse();
    return result;
  }
  if (end >= length) {
    result.resources = resources.slice(0, start);
    result.done = true;
    result.resources.reverse();
    return result;
  }

  // we want to get latest items first
  result.resources = resources.slice(length - end, length - start);
  result.resources.reverse();
  return result;
};

export default GLOBAL;

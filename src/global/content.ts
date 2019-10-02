import fs from 'fs';
import GLOBAL from './dataStore';
import { Resource, Type, Tag, Company } from './dataTypes';

const gen64Asset = (filename: string) => {
  const binary = fs.readFileSync(`${__dirname}/../../meta/${filename}`);
  return Buffer.from(binary).toString('base64');
};
/**
 * function that pre allocates content that exists on the server.
 * It includes curated data and hashtable look up info like icons
 */
const GenContent = () => {
  const yt64 = gen64Asset('ytIcon.png');
  const gh64 = gen64Asset('ghIcon.svg');
  const gdcV64 = gen64Asset('gdcVIcon.png');

  const epic64 = gen64Asset('epic.png');
  const play64 = gen64Asset('playstation.png');
  const riot64 = gen64Asset('riot.png');
  const unity64 = gen64Asset('unity.png');
  const wbg64 = gen64Asset('wbgames.png');

  const curatedYouTubeContent: Resource[] = [
    {
      type: Type.YouTube,
      link: 'https://youtu.be/sMkMr2455mk',
      title: 'Succeed in Any Programming Interview 2019',
      icon: yt64,
      description:
        "I've created a study plan to help anyone succeed in a programming interview! I've compiled it using my own interviewing experiences at tech companies in Silicon Valley, the experiences of my friends who currently work at Big N tech companies",
      tags: [Tag['C++']]
    },
    {
      type: Type.YouTube,
      link: 'https://youtu.be/tBO-RvTPETU',
      title:
        'How to Get a Game Development Job - My Best Tips For Beginners & Experts',
      icon: yt64,
      description:
        "Want to get a job as a game developer?  I'll tell you everything I know about getting hired for your first position, how to get through the application and interview process, and what to do once you're there.",
      tags: [Tag.Unity]
    },
    {
      type: Type.YouTube,
      link: 'https://youtu.be/cV5HArLYajE',
      title:
        'Everyone Watching This Is Fired: Tips for Game Industry Programmers',
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
      title: 'Janus Framework',
      icon: gh64,
      description:
        'An Unreal Engine powered framework designed to bootstrap ARPG games with a mid-large open world setting. Creators of this FW have gone to intern at WB Games and Twitch',
      tags: [Tag.GitHub, Tag['C++'], Tag.Unreal]
    },
    {
      type: Type.GitHub,
      link: 'https://github.com/EthanNichols/DXCentsEngine',
      title: 'Cents Engine',
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
      title: 'How NOT to Get a Job in the Game Industry',
      icon: gdcV64,
      description:
        'Want to learn how to make every mistake in the book when applying for a job? Interested in understanding what it takes to make a poor or unmemorable first impression? Join industry Hiring Managers Lindsey McQueeney and Dino McGraw as they offer advice to, real-world examples of the common pitfalls and mistakes candidates make when applying for a game development position.',
      tags: [Tag.Vault]
    }
  ];

  const curatedCompanies: Company[] = [
    {
      name: 'Epic Games',
      icon: epic64,
      link: 'https://www.epicgames.com/site/en-US/careers',
      meta: {
        ratio: { like: 9, dislike: 2 } // based on known info
      }
    },
    {
      name: 'Unity Technologies',
      icon: unity64,
      link: 'https://careers.unity.com/',
      meta: {
        ratio: { like: 17, dislike: 3 } // based on known info
      }
    },
    {
      name: 'Riot Games',
      icon: riot64,
      link: 'https://www.riotgames.com/en/work-with-us/jobs',
      meta: {
        ratio: { like: 4, dislike: 0 } // based on known info
      }
    },
    {
      name: 'WB Games',
      icon: wbg64,
      link: 'https://careers.wbgames.com/',
      meta: {
        ratio: { like: 21, dislike: 5 } // based on known info
      }
    },
    {
      name: 'PlayStation',
      icon: play64,
      link: 'https://www.playstation.com/en-us/corporate/about/careers/',
      meta: {
        ratio: { like: 13, dislike: 1 } // based on known info
      }
    }
  ];

  GLOBAL.store.companies = curatedCompanies;
  GLOBAL.store.resources = GLOBAL.store.resources.concat(
    curatedGDCVaultContent,
    curatedGithubContent,
    curatedYouTubeContent
  );
  GLOBAL.iconMap.GDCVault = gdcV64;
  GLOBAL.iconMap.GitHub = gh64;
  GLOBAL.iconMap.YouTube = yt64;
};

export default GenContent;

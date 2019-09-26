import fs from 'fs';
import GLOBAL from './dataStore';
import { Resource, Type, Tag } from './dataTypes';

/**
 * function that pre allocates content that exists on the server.
 * It includes curated data and hashtable look up info like icons
 */
const GenContent = () => {
  const ytIcon = fs.readFileSync(`${__dirname}/../../meta/ytIcon.png`);
  const ghIcon = fs.readFileSync(`${__dirname}/../../meta/ghIcon.svg`);
  const gdcVIcon = fs.readFileSync(`${__dirname}/../../meta/gdcVIcon.png`);
  const yt64 = Buffer.from(ytIcon).toString('base64');
  const gh64 = Buffer.from(ghIcon).toString('base64');
  const gdcV64 = Buffer.from(gdcVIcon).toString('base64');
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

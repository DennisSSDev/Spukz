"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var dataStore_1 = __importDefault(require("./dataStore"));
var dataTypes_1 = require("./dataTypes");
var gen64Asset = function (filename) {
    var binary = fs_1.default.readFileSync(__dirname + "/../../meta/" + filename);
    return Buffer.from(binary).toString('base64');
};
/**
 * function that pre allocates content that exists on the server.
 * It includes curated data and hashtable look up info like icons
 */
var GenContent = function () {
    var yt64 = gen64Asset('ytIcon.png');
    var gh64 = gen64Asset('ghIcon.svg');
    var gdcV64 = gen64Asset('gdcVIcon.png');
    var epic64 = gen64Asset('epic.png');
    var play64 = gen64Asset('playstation.png');
    var riot64 = gen64Asset('riot.png');
    var unity64 = gen64Asset('unity.png');
    var wbg64 = gen64Asset('wbgames.png');
    var curatedYouTubeContent = [
        {
            type: dataTypes_1.Type.YouTube,
            link: 'https://youtu.be/sMkMr2455mk',
            title: 'Succeed in Any Programming Interview 2019',
            icon: yt64,
            description: "I've created a study plan to help anyone succeed in a programming interview! I've compiled it using my own interviewing experiences at tech companies in Silicon Valley, the experiences of my friends who currently work at Big N tech companies",
            tags: [dataTypes_1.Tag['C++']]
        },
        {
            type: dataTypes_1.Type.YouTube,
            link: 'https://youtu.be/tBO-RvTPETU',
            title: 'How to Get a Game Development Job - My Best Tips For Beginners & Experts',
            icon: yt64,
            description: "Want to get a job as a game developer?  I'll tell you everything I know about getting hired for your first position, how to get through the application and interview process, and what to do once you're there.",
            tags: [dataTypes_1.Tag.Unity]
        },
        {
            type: dataTypes_1.Type.YouTube,
            link: 'https://youtu.be/cV5HArLYajE',
            title: 'Everyone Watching This Is Fired: Tips for Game Industry Programmers',
            icon: yt64,
            description: "Unity's Mike Acton presents some broad, sweeping, and perhaps unfair generalizations about programmers in the video industry, and discusses what it would mean to be among the very best programmers in the field.",
            tags: [dataTypes_1.Tag.Unity, dataTypes_1.Tag.Vault, dataTypes_1.Tag['C++']]
        }
    ];
    var curatedGithubContent = [
        {
            type: dataTypes_1.Type.GitHub,
            link: 'https://github.com/nujas/TheJanusFramework',
            title: 'Janus Framework',
            icon: gh64,
            description: 'An Unreal Engine powered framework designed to bootstrap ARPG games with a mid-large open world setting. Creators of this FW have gone to intern at WB Games and Twitch',
            tags: [dataTypes_1.Tag.GitHub, dataTypes_1.Tag['C++'], dataTypes_1.Tag.Unreal]
        },
        {
            type: dataTypes_1.Type.GitHub,
            link: 'https://github.com/EthanNichols/DXCentsEngine',
            title: 'Cents Engine',
            icon: gh64,
            description: 'A "student made" game engine in DX11 with C++ that has landed the student an internship opportunity at Activision',
            tags: [dataTypes_1.Tag.GitHub, dataTypes_1.Tag['C++']]
        }
    ];
    var curatedGDCVaultContent = [
        {
            type: dataTypes_1.Type.GDCVault,
            link: 'https://www.gdcvault.com/play/1015086',
            title: 'How NOT to Get a Job in the Game Industry',
            icon: gdcV64,
            description: 'Want to learn how to make every mistake in the book when applying for a job? Interested in understanding what it takes to make a poor or unmemorable first impression? Join industry Hiring Managers Lindsey McQueeney and Dino McGraw as they offer advice to, real-world examples of the common pitfalls and mistakes candidates make when applying for a game development position.',
            tags: [dataTypes_1.Tag.Vault]
        }
    ];
    var curatedCompanies = [
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
    dataStore_1.default.store.companies = curatedCompanies;
    dataStore_1.default.store.resources = dataStore_1.default.store.resources.concat(curatedGDCVaultContent, curatedGithubContent, curatedYouTubeContent);
    dataStore_1.default.iconMap.GDCVault = gdcV64;
    dataStore_1.default.iconMap.GitHub = gh64;
    dataStore_1.default.iconMap.YouTube = yt64;
};
exports.default = GenContent;

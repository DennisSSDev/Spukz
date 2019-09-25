"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var dataTypes_1 = require("./dataTypes");
var GLOBAL = {
    store: { resources: [] },
    iconMap: {
        GitHub: '',
        YouTube: '',
        GDCVault: ''
    }
};
exports.GenContent = function () {
    var ytIcon = fs_1.default.readFileSync(__dirname + "/../meta/ytIcon.png");
    var ghIcon = fs_1.default.readFileSync(__dirname + "/../meta/ghIcon.svg");
    var gdcVIcon = fs_1.default.readFileSync(__dirname + "/../meta/gdcVIcon.png");
    var yt64 = Buffer.from(ytIcon).toString('base64');
    var gh64 = Buffer.from(ghIcon).toString('base64');
    var gdcV64 = Buffer.from(gdcVIcon).toString('base64');
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
    GLOBAL.store.resources = GLOBAL.store.resources.concat(curatedGDCVaultContent, curatedGithubContent, curatedYouTubeContent);
    GLOBAL.iconMap.GDCVault = gdcV64;
    GLOBAL.iconMap.GitHub = gh64;
    GLOBAL.iconMap.YouTube = yt64;
};
exports.AddNewResource = function (res) {
    var status = 201;
    var update = false;
    var i = -1;
    GLOBAL.store.resources.forEach(function (value, index) {
        if (value.link === res.link) {
            status = 204;
            update = true;
            i = index;
        }
    });
    if (!update) {
        GLOBAL.store.resources.push(res);
    }
    else {
        GLOBAL.store.resources[i] = res;
    }
    return status;
};
// helper function to deal with resource cut outs based on start and end
var handleResourceSubDivision = function (resources, start, end) {
    var result = {
        resources: [],
        done: false
    };
    var length = resources.length;
    if (length - end < 0) {
        result.resources = resources.slice(0, length - start);
        result.done = true;
        result.resources.reverse();
        return result;
    }
    if (end > length) {
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
// both params inclusive
// if the end overflows - range would go to the last element
exports.GetResources = function (start, end, tags) {
    var resources = GLOBAL.store.resources;
    var length = resources.length;
    var result = {
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
    var filteredResources = [];
    var hasFiltered = false;
    if (tags.length > 0) {
        hasFiltered = true;
        filteredResources = resources.filter(function (res) {
            var count = 0;
            var min = tags.length;
            tags.forEach(function (tag) {
                if (res.tags.includes(tag)) {
                    ++count;
                }
            });
            return count === min;
        });
    }
    if (hasFiltered) {
        return handleResourceSubDivision(filteredResources, start, end);
    }
    return handleResourceSubDivision(resources, start, end);
};
exports.default = GLOBAL;

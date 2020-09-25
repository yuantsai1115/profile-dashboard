export const sampleProfiles = [
    {
        name: "習近平",
        enrol_year: "87級",
        comment: "我是席",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/32/Xi_Jinping_2019.jpg"
    },
    {
        name: "川普",
        enrol_year: "78級",
        comment: "三鋪",
        thumbnail: "http://t1.gstatic.com/images?q=tbn:ANd9GcQQn6_Hz9zTckXYuOa1biiMhulnHv6pKtadAFcdg79yocrL3Y29"
    },
    {
        name: "普丁丁",
        enrol_year: "88級",
        comment: "ㄎㄎ",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Vladimir_Putin_%282020-02-20%29.jpg/1200px-Vladimir_Putin_%282020-02-20%29.jpg"
    },
    {
        name: "英文",
        enrol_year: "98級",
        comment: "我菜",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/%E8%94%A1%E8%8B%B1%E6%96%87%E5%AE%98%E6%96%B9%E5%85%83%E9%A6%96%E8%82%96%E5%83%8F%E7%85%A7.png/220px-%E8%94%A1%E8%8B%B1%E6%96%87%E5%AE%98%E6%96%B9%E5%85%83%E9%A6%96%E8%82%96%E5%83%8F%E7%85%A7.png"
    },
    {
        name: "近三",
        enrol_year: "88級",
        comment: "禁三三三三三",
        thumbnail: "https://www.kantei.go.jp/jp/content/20150101souri_2.jpg"
    },
    {
        name: "沒克額",
        enrol_year: "77級",
        comment: "顆顆",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Angela_Merkel_June_2017.jpg"
    },
    {
        name: "國魚",
        enrol_year: "87級",
        comment: "游啊游",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/6a/%E9%AB%98%E9%9B%84%E5%B8%82%E9%95%B7_%E9%9F%93%E5%9C%8B%E7%91%9C.jpg"
    },
    {
        name: "家魚",
        enrol_year: "77級",
        comment: "啦啦啦",
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/%E7%AB%8B%E6%B3%95%E5%A7%94%E5%93%A1%E9%AB%98%E5%98%89%E7%91%9C.jpg/220px-%E7%AB%8B%E6%B3%95%E5%A7%94%E5%93%A1%E9%AB%98%E5%98%89%E7%91%9C.jpg"
    },
    {
        name: "熊熊熊",
        enrol_year: "66級",
        comment: "哇嗚哇嗚",
        thumbnail: "https://4.bp.blogspot.com/-oeiWI0le6BY/UoZB94Jzw6I/AAAAAAAADUc/o18kxKX1Lp4/s1600/1-130G5234911.jpg"
    },
    {
        name: "龔狗狗",
        enrol_year: "66級",
        comment: "哇汪汪 唷汪汪汪",
        thumbnail: "https://f.share.photo.xuite.net/firepeng/1f76c72/12340125/604113109_m.jpg"
    },
    {
        name: "蜥蜥蜴",
        enrol_year: "88級",
        comment: "西西簌簌 悉簌簌",
        thumbnail: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
    },
    {
        name: "歐力歐",
        enrol_year: "99級",
        comment: "登登～登～燈等燈～燈",
        thumbnail: "https://drive.google.com/uc?export=view&id=1UXJXN6_xJt_peBuNFv4CPvAlcdCt3mAo"
    }
];

const getNonRepitionNumbers = (max, size) => {
    let arrayContainer = []; 
    const genNum = Math.floor(Math.random() * Math.floor(max));
    arrayContainer.push(genNum);
    for (let counter = 0; counter < size-1; counter++) { 
        let newGen = Math.floor(Math.random() * Math.floor(max));
        while (arrayContainer.lastIndexOf(newGen) !== -1) {
            newGen = Math.floor(Math.random() * Math.floor(max));
        }
        arrayContainer.push(newGen);
    }
    return arrayContainer;
}

export const getSampleProfiles = (number) => {
    if(typeof number !== 'number')
    return;
    let results = [];
    let indices = getNonRepitionNumbers(sampleProfiles.length, number);
    console.log(indices);

    indices.map((i)=>{
        results.push(sampleProfiles[i]);
    });
    return results;
}

export const getProfiles = (number) => {
    if(typeof number !== 'number')
    return;
    let results = [];
    let indices = getNonRepitionNumbers(profiles.length, number);
    console.log(indices);

    indices.map((i)=>{
        results.push(profiles[i]);
    });
    return results;
}

export const profiles = [

];
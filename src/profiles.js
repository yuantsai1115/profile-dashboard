export const sampleProfiles = [
    {
        name: "習近平",
        grade: "87級",
        text: "我是席",
        thumbnails: "https://upload.wikimedia.org/wikipedia/commons/3/32/Xi_Jinping_2019.jpg"
    },
    {
        name: "川普",
        grade: "78級",
        text: "三鋪",
        thumbnails: "http://t1.gstatic.com/images?q=tbn:ANd9GcQQn6_Hz9zTckXYuOa1biiMhulnHv6pKtadAFcdg79yocrL3Y29"
    },
    {
        name: "普丁丁",
        grade: "88級",
        text: "ㄎㄎ",
        thumbnails: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Vladimir_Putin_%282020-02-20%29.jpg/1200px-Vladimir_Putin_%282020-02-20%29.jpg"
    },
    {
        name: "英文",
        grade: "98級",
        text: "我菜",
        thumbnails: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/%E8%94%A1%E8%8B%B1%E6%96%87%E5%AE%98%E6%96%B9%E5%85%83%E9%A6%96%E8%82%96%E5%83%8F%E7%85%A7.png/220px-%E8%94%A1%E8%8B%B1%E6%96%87%E5%AE%98%E6%96%B9%E5%85%83%E9%A6%96%E8%82%96%E5%83%8F%E7%85%A7.png"
    },
    {
        name: "近三",
        grade: "88級",
        text: "禁三三三三三",
        thumbnails: "https://www.kantei.go.jp/jp/content/20150101souri_2.jpg"
    },
    {
        name: "沒克額",
        grade: "77級",
        text: "顆顆",
        thumbnails: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Angela_Merkel_June_2017.jpg"
    },
    {
        name: "國魚",
        grade: "87級",
        text: "游啊游",
        thumbnails: "https://upload.wikimedia.org/wikipedia/commons/6/6a/%E9%AB%98%E9%9B%84%E5%B8%82%E9%95%B7_%E9%9F%93%E5%9C%8B%E7%91%9C.jpg"
    },
    {
        name: "家魚",
        grade: "77級",
        text: "啦啦啦",
        thumbnails: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/%E7%AB%8B%E6%B3%95%E5%A7%94%E5%93%A1%E9%AB%98%E5%98%89%E7%91%9C.jpg/220px-%E7%AB%8B%E6%B3%95%E5%A7%94%E5%93%A1%E9%AB%98%E5%98%89%E7%91%9C.jpg"
    },
    {
        name: "熊熊熊",
        grade: "66級",
        text: "哇嗚哇嗚",
        thumbnails: "https://4.bp.blogspot.com/-oeiWI0le6BY/UoZB94Jzw6I/AAAAAAAADUc/o18kxKX1Lp4/s1600/1-130G5234911.jpg"
    },
    {
        name: "龔狗狗",
        grade: "66級",
        text: "哇汪汪 唷汪汪汪",
        thumbnails: "https://f.share.photo.xuite.net/firepeng/1f76c72/12340125/604113109_m.jpg"
    },
    {
        name: "蜥蜥蜴",
        grade: "88級",
        text: "西西簌簌 悉簌簌",
        thumbnails: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
    },
    {
        name: "歐力歐",
        grade: "99級",
        text: "登登～登～燈等燈～燈",
        thumbnails: "https://drive.google.com/uc?export=view&id=1UXJXN6_xJt_peBuNFv4CPvAlcdCt3mAo"
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
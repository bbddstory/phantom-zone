interface ILocaleLang {
    [key: string]: any
}

const lang: ILocaleLang = {
    en: {
        'cats.movies': 'Movies',
        'cats.tv': 'TV',
        'cats.docs': 'Documentaries',
        'cats.anime': 'Animations',
        'cats.xxx': 'AAA',
        'cats.jav': 'BBB',
        'search.txt': 'Search video name',
        'pg.first': 'First (Shift + Home)',
        'pg.prev': 'Prev (Left Arrow)',
        'pg.next': 'Next (Right Arrow)',
        'pg.last': 'Last (Shift + End)',
        'ft.zone': 'QuickConnect',
        'ft.home': 'Home',
        'ft.fb': 'Give feedback',
        'home.latest': 'Latest Videos',
        'home.watch': 'Watch Later',
        'home.recomm': 'Recommendations',
        'home.empty': 'List is empty'
    },
    zh: {
        'cats.movies': '电影',
        'cats.tv': '电视剧',
        'cats.docs': '记录片',
        'cats.anime': '动画片',
        'cats.xxx': '欧美成人',
        'cats.jav': '日本成人',
        'search.txt': '搜索影视名称',
        'pg.first': '第一页 (Shift + Home)',
        'pg.prev': '前一页 (Left Arrow)',
        'pg.next': '下一页 (Right Arrow)',
        'pg.last': '最后页 (Shift + End)',
        'ft.zone': '幽灵快链',
        'ft.home': '首页',
        'ft.fb': '反馈意见',
        'home.latest': '新增影视',
        'home.watch': '我的视频',
        'home.recomm': '朋友推荐',
        'home.empty': '列表为空'
    },
    ja: {
        'cats.movies': '映画',
        'cats.tv': 'テレビ',
        'cats.docs': 'ドキュメンタリー',
        'cats.anime': 'アニメ',
        'cats.xxx': '西洋成人',
        'cats.jav': 'エロ',
        'search.txt': '検索ビデオの名前',
        'pg.first': '最初のページ (Shift + Home)',
        'pg.prev': '前のページ (Left Arrow)',
        'pg.next': '次のページ (Right Arrow)',
        'pg.last': '最後のページ (Shift + End)',
        'ft.zone': 'クイックコネクト',
        'ft.home': 'ホーム',
        'ft.fb': 'フィードバック',
        'home.latest': '新しいビデオ',
        'home.watch': '後で見る',
        'home.recomm': 'おすすめ',
        'home.empty': '再生リストは空です'
    }
}

export default lang;
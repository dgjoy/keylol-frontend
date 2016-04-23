(function () {
    function missiveTextReduce(text, n) {
        return text.length > n ? `${text.substr(0, n)}…` : text;
    }

    keylolApp.constant('messageTypes', {
        ArticleLike: {
            type: '认可',
            backgroundUrl: 'keylol://0abeafd8e4c049bce860686bc4c04829.jpg',
            getSummary () {
                return '认可文章';
            },
        },
        CommentLike: {
            type: '认可',
            backgroundUrl: 'keylol://0abeafd8e4c049bce860686bc4c04829.jpg',
            getSummary () {
                return '认可评论';
            },
        },
        ArticleComment: {
            type: '评论',
            backgroundUrl: 'keylol://672a1bab71b9af43215d252471a893e0.jpg',
            getSummary (message) {
                return message.Comment.Content;
            },
        },
        CommentReply: {
            type: '评论',
            backgroundUrl: 'keylol://672a1bab71b9af43215d252471a893e0.jpg',
            getSummary (message) {
                return message.Comment.Content;
            },
        },
        ArticleArchive: {
            type: '公函',
            name: '封存通告',
            englishName: 'Archives Receipt',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `你的文章《${missiveTextReduce(message.Article.Title, 14)}》已被封存，封存后该文章的内容和所有评论会被隐藏，同时这篇文章不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。`;
            },
            getHeader (message) {
                return `你的文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>已被封存，封存后该文章的内容和所有评论会被隐藏，同时这篇文章不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        ArticleArchiveCancel: {
            type: '公函',
            name: '封存撤销通告',
            englishName: 'Releasing a previous archive',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.Article.Title, 14)}》的封存已被撤销，该文章的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇文章。`;
            },
            getHeader (message) {
                return `文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>的封存已被撤销，该文章的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇文章。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        CommentArchive: {
            type: '公函',
            name: '封存通告',
            englishName: 'Archives Receipt',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `你在《${missiveTextReduce(message.Article.Title, 14)}》中的评论「${missiveTextReduce(message.Comment.Content, 14)}」已被封存，` +
                    '封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。';
            },
            getHeader (message) {
                return `你在<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>中的评论<a href="article/${message.Article.AuthorIdCode}/` +
                    `${message.Article.SequenceNumberForAuthor}#${message.Comment.SequenceNumberForArticle}">` +
                    `「${missiveTextReduce(message.Comment.Content, 14)}」</a>已被封存，` +
                    '封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。';
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        CommentArchiveCancel: {
            type: '公函',
            name: '封存撤销通告',
            englishName: 'Releasing a previous archive',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.Article.Title, 14)}》下评论「${missiveTextReduce(message.Comment.Content, 14)}」` +
                    '的封存已被撤销，此则评论的内容和作者信息已重新公开。';
            },
            getHeader(message) {
                return `文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>下评论<a href="article/${message.Article.AuthorIdCode}/` +
                    `${message.Article.SequenceNumberForAuthor}#${message.Comment.SequenceNumberForArticle}">` +
                    `「${missiveTextReduce(message.Comment.Content, 14)}」</a>的封存已被撤销，此则评论的内容和作者信息已重新公开。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        Rejection: {
            type: '公函',
            name: '退稿函',
            englishName: 'Letter of Rejection',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `很遗憾，你的文章《${missiveTextReduce(message.Article.Title, 14)}》已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇文章后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇文章。`;
            },
            getHeader (message) {
                return `很遗憾，你的文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇文章后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇文章。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        RejectionCancel: {
            type: '公函',
            name: '退稿撤销通告',
            englishName: 'Cancelling a previous rejection',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.Article.Title, 14)}》的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇文章，后续的投稿也不再会被其他据点回绝。`;
            },
            getHeader (message) {
                return `文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇文章，后续的投稿也不再会被其他据点回绝。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        Spotlight: {
            type: '公函',
            name: '萃选录入函',
            englishName: 'Spotlight Recommendation',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `感谢你对其乐社区质量的认可与贡献！你的文章《${missiveTextReduce(message.Article.Title, 14)}》已被推荐为萃选文章，此文章将会展示在全站的「萃选文章」栏目中，萃选展现周期为 14 天。`;
            },
            getHeader (message) {
                return `感谢你对其乐社区质量的认可与贡献！你的文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}'>` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>已被推荐为萃选文章，此文章将会展示在全站的「萃选文章」栏目中，萃选展现周期为 14 天。`;
            },
            getFooter () {
                return '若希望从「萃选文章」栏目中撤下自己的文章，你可以随时在文章中执行「撤销萃选」的操作。如需了解更多详情，可致函其乐职员团队的 ' +
                    '<a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，邮件中请注明此函右下角的公函编号并附相关参考资料以供参考。';
            },
        },
        SpotlightCancel: {
            type: '公函',
            name: '萃选撤销通告',
            englishName: 'Cancelling a spotlight recommendation',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.Article.Title, 14)}》的萃选推荐已被撤销，该文章已经提前从「萃选文章」栏目撤下。`;
            },
            getHeader (message) {
                return `文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>的萃选推荐已被撤销，该文章已经提前从「萃选文章」栏目撤下。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        ArticleWarning: {
            type: '公函',
            name: '惩教警告',
            englishName: 'Correctional Warning',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `你的文章《${missiveTextReduce(message.Article.Title, 14)}》已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
            getHeader (message) {
                return `你的文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        ArticleWarningCancel: {
            type: '公函',
            name: '警告撤销通告',
            englishName: 'Retrieving a correctional warning',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.Article.Title, 14)}》的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
            getHeader (message) {
                return `文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        CommentWarning: {
            type: '公函',
            name: '惩教警告',
            englishName: 'Correctional Warning',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `你在《${missiveTextReduce(message.Article.Title, 14)}》中的评论「${missiveTextReduce(message.Comment.Content, 14)}」` +
                    '已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。';
            },
            getHeader (message) {
                return `你在<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>中的评论<a href="article/${message.Article.AuthorIdCode}` +
                    `/${message.Article.SequenceNumberForAuthor}#${message.Comment.SequenceNumberForArticle}">` +
                    `「${missiveTextReduce(message.Comment.Content, 14)}」</a>已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
        CommentWarningCancel: {
            type: '公函',
            name: '警告撤销通告',
            englishName: 'Retrieving a correctional warning',
            backgroundUrl: 'keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.Article.Title, 14)}》下评论「${missiveTextReduce(message.Comment.Content, 14)}」收到的警告已被撤销，` +
                    '之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。';
            },
            getHeader (message) {
                return `文章<a href="article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}">` +
                    `《${missiveTextReduce(message.Article.Title, 14)}》</a>下评论<a href="article/${message.Article.AuthorIdCode}` +
                    `/${message.Article.SequenceNumberForAuthor}#${message.Comment.SequenceNumberForArticle}">` +
                    `「${missiveTextReduce(message.Comment.Content, 14)}」</a>收到的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
            getFooter () {
                return '若对以上操作持有异议或不解，烦请致函其乐职员团队的 <a href="mailto:alpha.appeal@keylol.com">反馈邮箱</a>，' +
                    '邮件中需注明此函右下角的公函编号并附相关参考资料作为佐证。公测期间部分功能无法就位，投诉反馈流程繁琐之处，敬请谅解。';
            },
        },
    });
}());

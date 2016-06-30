(function () {
    function missiveTextReduce(text, n) {
        if (text === undefined) {
            return '';
        }
        return text.length > n ? `${text.substr(0, n)}…` : text;
    }

    keylolApp.constant('messageTypes', {
        newSubscriber: {
            source: '用户',
            type: '听众',
            getName(message) {
                return '开始关注你';
            },
            getSummary (message) {
                return `成为你的第 ${message.count} 位听众`;
            },
            getLink(message) {
                return `user/${message.operatorIdCode}`;
            },
        },
        articleLike: {
            source: '用户',
            type: '认可',
            name: '认可你的文章',
            getName(message) {
                return `认可你的文章<a href="article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
            },
            getSummary (message) {
                if (message.count === undefined) {
                    return '获得认可';
                } else {
                    return `获得生涯第 ${message.count} 份认可，该文章已被认可 ${message.secondCount} 次`;
                }
            },
            getLink(message) {
                return `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
            },
        },
        activityLike: {
            source: '用户',
            type: '认可',
            name: '认可你的动态',
            getName(message) {
                return `认可你的动态<a href="activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
            },
            getSummary (message) {
                if (message.count === undefined) {
                    return '获得认可';
                } else {
                    return `获得生涯第 ${message.count} 份认可，该动态已被认可 ${message.secondCount} 次`;
                }
            },
            getLink(message) {
                return `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
            },
        },
        articleCommentLike: {
            source: '用户',
            type: '认可',
            name: '认可你的评论',
            getName(message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                return `认可你在<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>` +
                        `中的评论<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
            },
            getSummary (message) {
                if (message.count === undefined) {
                    return '获得认可';
                } else {
                    return `获得生涯第 ${message.count} 份认可，该评论已被认可 ${message.secondCount} 次`;
                }
            },
            getLink(message) {
                return `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
            },
        },
        activityCommentLike: {
            source: '用户',
            type: '认可',
            name: '认可你的评论',
            getName(message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                return `认可你在<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>` +
                        `中的评论<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
            },
            getSummary (message) {
                if (message.count === undefined) {
                    return '获得认可';
                } else {
                    return `获得生涯第 ${message.count} 份认可，该评论已被认可 ${message.secondCount} 次`;
                }
            },
            getLink(message) {
                return `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
            },
        },

        articleComment: {
            source: '用户',
            type: '评论',
            getName(message) {
                return `回复你的文章<a href="article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
            },
            getSummary (message) {
                return message.commentContent;
            },
            getLink(message) {
                return `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
            },
        },
        articleCommentReply: {
            source: '用户',
            type: '评论',
            getName(message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                return `回复你在<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>中的评论`;
            },
            getSummary (message) {
                return message.commentContent;
            },
            getLink(message) {
                return `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
            },
        },
        activityComment: {
            source: '用户',
            type: '评论',
            getName(message) {
                return `回复你的动态<a href="activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
            },
            getSummary (message) {
                return message.commentContent;
            },
            getLink(message) {
                return `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
            },
        },
        activityCommentReply: {
            source: '用户',
            type: '评论',
            getName(message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                return `回复你在<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>中的评论`;
            },
            getSummary (message) {
                return message.commentContent;
            },
            getLink(message) {
                return `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
            },
        },

        // 编辑部
        articleArchive: {
            source: '编辑部',
            type: '公函',
            name: '封存通告',
            getSummary (message) {
                return `你的文章《${missiveTextReduce(message.articleTitle, 14)}》已被封存，封存后该文章的内容和所有评论会被隐藏，同时这篇文章不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `你的文章${at}已被封存，封存后该文章的内容和所有评论会被隐藏，同时这篇文章不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。`;
            },
        },
        articleArchiveCancel: {
            source: '编辑部',
            type: '公函',
            name: '封存撤销通告',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.articleTitle, 14)}》的封存已被撤销，该文章的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇文章。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `文章${at}的封存已被撤销，该文章的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇文章。`;
            },
        },
        articleCommentArchive: {
            source: '编辑部 ',
            type: '公函',
            name: '封存通告',
            getSummary (message) {
                return `你在《${missiveTextReduce(message.articleTitle, 14)}》中的评论「${missiveTextReduce(message.commentContent, 14)}」已被封存，` +
                    '封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。';
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `你在${at}中的评论${cc}已被封存，` +
                    '封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。';
            },
        },
        articleCommentArchiveCancel: {
            source: '编辑部 ',
            type: '公函',
            name: '封存撤销通告',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.articleTitle, 14)}》下评论「${missiveTextReduce(message.commentContent, 14)}」` +
                    '的封存已被撤销，此则评论的内容和作者信息已重新公开。';
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `文章${at}下评论${cc}的封存已被撤销，此则评论的内容和作者信息已重新公开。`;
            },
        },

        activityArchive: {
            source: '编辑部',
            type: '公函',
            name: '封存通告',
            getSummary (message) {
                return `你的动态《${missiveTextReduce(message.activityContent, 14)}》已被封存，封存后该动态的内容和所有评论会被隐藏，同时这篇动态不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。`;
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                return `你的动态${ac}已被封存，封存后该动态的内容和所有评论会被隐藏，同时这篇动态不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。`;
            },
        },
        activityArchiveCancel: {
            source: '编辑部',
            type: '公函',
            name: '封存撤销通告',
            getSummary (message) {
                return `动态《${missiveTextReduce(message.activityContent, 14)}》的封存已被撤销，该动态的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇动态。`;
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                return `动态${ac}的封存已被撤销，该动态的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇动态。`;
            },
        },
        activityCommentArchive: {
            source: '编辑部 ',
            type: '公函',
            name: '封存通告',
            getSummary (message) {
                return `你在《${missiveTextReduce(message.articleTitle, 14)}》中的评论「${missiveTextReduce(message.commentContent, 14)}」已被封存，` +
                    '封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。';
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `你在${ac}中的评论${cc}已被封存，` +
                    '封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。';
            },
        },
        activityCommentArchiveCancel: {
            source: '编辑部 ',
            type: '公函',
            name: '封存撤销通告',
            getSummary (message) {
                return `动态《${missiveTextReduce(message.articleTitle, 14)}》下评论「${missiveTextReduce(message.commentContent, 14)}」` +
                    '的封存已被撤销，此则评论的内容和作者信息已重新公开。';
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `动态${ac}下评论${cc}` +
                    '的封存已被撤销，此则评论的内容和作者信息已重新公开。';
            },
        },
        articleRejection: {
            source: '编辑部',
            type: '公函',
            name: '退稿函',
            getSummary (message) {
                return `很遗憾，你的文章《${missiveTextReduce(message.articleTitle, 14)}》已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇文章后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇文章。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `很遗憾，你的文章${at}已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇文章后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇文章。`;
            },
        },
        articleRejectionCancel: {
            source: '编辑部',
            type: '公函',
            name: '退稿撤销通告',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.articleTitle, 14)}》的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇文章，后续的投稿也不再会被其他据点回绝。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `文章${at}的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇文章，后续的投稿也不再会被其他据点回绝。`;
            },
        },
        activityRejection: {
            source: '编辑部',
            type: '公函',
            name: '退稿函',
            getSummary (message) {
                return `很遗憾，你的动态《${missiveTextReduce(message.activityContent, 14)}》已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇动态后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇动态。`;
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                return `很遗憾，你的动态${ac}已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇动态后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇动态。`;
            },
        },
        activityRejectionCancel: {
            source: '编辑部',
            type: '公函',
            name: '退稿撤销通告',
            getSummary (message) {
                return `动态《${missiveTextReduce(message.activityContent, 14)}》的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇动态，后续的投稿也不再会被其他据点回绝。`;
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                return `动态${ac}的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇动态，后续的投稿也不再会被其他据点回绝。`;
            },
        },
        spotlight: {
            source: '编辑部',
            type: '公函',
            name: '萃选录入函',
            getSummary (message) {
                return `感谢你对其乐社区质量的认可与贡献！你的文章《${missiveTextReduce(message.articleTitle, 14)}》已被推荐为萃选文章。此次萃选已记录在你的生涯档案中，并在文章中永久展示萃选标记。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `感谢你对其乐社区质量的认可与贡献！你的文章${at}已被推荐为萃选文章。此次萃选已记录在你的生涯档案中，并在文章中永久展示萃选标记。`;
            },
        },
        spotlightCancel: {
            source: '编辑部',
            type: '公函',
            name: '萃选撤销通告',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.articleTitle, 14)}》的萃选推荐已被撤销，该文章的萃选记录已被收回。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `文章${at}的萃选推荐已被撤销，该文章已经提前从「萃选文章」栏目撤下。`;
            },
        },

        // 惩教系统
        articleWarning: {
            source: '惩教系统',
            type: '公函',
            name: '惩教警告',
            getSummary (message) {
                return `你的文章《${missiveTextReduce(message.articleTitle, 14)}》已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `你的文章${at}已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
        },
        articleWarningCancel: {
            source: '惩教系统',
            type: '公函',
            name: '警告撤销通告',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.articleTitle, 14)}》的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                return `文章${at}的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
        },
        articleCommentWarning: {
            source: '惩教系统',
            type: '公函',
            name: '惩教警告',
            getSummary (message) {
                return `你在《${missiveTextReduce(message.articleTitle, 14)}》中的评论「${missiveTextReduce(message.commentContent, 14)}」` +
                    '已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。';
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `你在${at}中的评论${cc}` +
                    '已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。';
            },
        },
        articleCommentWarningCancel: {
            source: '惩教系统',
            type: '公函',
            name: '警告撤销通告',
            getSummary (message) {
                return `文章《${missiveTextReduce(message.articleTitle, 14)}》下评论「${missiveTextReduce(message.commentContent, 14)}」收到的警告已被撤销，` +
                    '之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。';
            },
            getHeader (message) {
                const link = `article/${message.articleAuthorIdCode}/${message.articleSidForAuthor}`;
                const at = `<a href="${link}">《${missiveTextReduce(message.articleTitle, 14)}》</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `文章${at}下评论${cc}收到的警告已被撤销，` +
                    '之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。';
            },
        },
        activityWarning: {
            source: '惩教系统',
            type: '公函',
            name: '惩教警告',
            getSummary (message) {
                return `你的动态《${missiveTextReduce(message.activityContent, 14)}》已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                return `你的动态${ac}已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。`;
            },
        },
        activityWarningCancel: {
            source: '惩教系统',
            type: '公函',
            name: '警告撤销通告',
            getSummary (message) {
                return `动态《${missiveTextReduce(message.activityContent, 14)}》的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                return `动态${ac}的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。`;
            },
        },
        activityCommentWarning: {
            source: '惩教系统',
            type: '公函',
            name: '惩教警告',
            getSummary (message) {
                return `你在《${missiveTextReduce(message.activityContent, 14)}》中的评论「${missiveTextReduce(message.commentContent, 14)}」` +
                    '已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。';
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `你在${ac}中的评论${cc}` +
                    '已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。';
            },
        },
        activityCommentWarningCancel: {
            source: '惩教系统',
            type: '公函',
            name: '警告撤销通告',
            getSummary (message) {
                return `动态《${missiveTextReduce(message.activityContent, 14)}》下评论「${missiveTextReduce(message.commentContent, 14)}」收到的警告已被撤销，` +
                    '之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。';
            },
            getHeader (message) {
                const link = `activity/${message.activityAuthorIdCode}/${message.activitySidForAuthor}`;
                const ac = `<a href="${link}">「${missiveTextReduce(message.activityContent, 14)}」</a>`;
                const cc = `<a href="${link}">「${missiveTextReduce(message.commentContent, 14)}」</a>`;
                return `动态${ac}下评论${cc}收到的警告已被撤销，` +
                    '之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。';
            },
        },
    });
}());

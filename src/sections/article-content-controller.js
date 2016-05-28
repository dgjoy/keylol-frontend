(function () {
    class ArticleContentController {
        constructor (union, $http, notification) {
            $.extend(this, {
                apiEndpoint,
                union,
                $http,
                notification,
            });

            this.article = {
                content: `<h1><b>标题1</b></h1>
                <p>头一次接触步行模拟类型的游戏是无意间玩到的Dear Esther。大概两个小时的游戏流程完结后，我满脑子只充斥着一个问题：我到底玩了个啥？尽管贴图精致、场景氛围上佳，但没有任何互动、从头到尾就是男主角一边用低沉的嗓音念着大段大段令人昏昏欲睡的独白一边在某小岛上散步……Dear Esther让我对这个类型的游戏产生了先入为主的排斥：连一点代入感都找不到的游戏，我干嘛不花两个小时去看场电影？</p>
                <p><img webp-src="//storage.keylol.com/51864f55bb59dc9c96401e88a240b7e7.jpg"><br></p>
                <p style="text-align: center"><i>剧情中通过字条表现的另一条暗线</i></p>
                <blockquote><p>英雄设计的矫枉过正</p></blockquote>
                <spoiler>
                    <div class="content"><p>剧透内容</p></div>
                </spoiler>
                <p>总而言之</p>`,
            };
        }
    }

    keylolApp.component('articleContent', {
        templateUrl: 'src/sections/article-content.html',
        controller: ArticleContentController,
        controllerAs: 'articleContent',
    });
}());

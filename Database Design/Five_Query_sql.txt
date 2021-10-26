--Check all articles in database.
select Articles.title from ArticleCate, Articles, Belong, Users
where Users.userId = ArticleCate.userId
and ArticleCate.cateId = Belong.cateId
and Articles.articleId = Belong.articleId;

--Select Articles which belong to study category.
select Articles.articleId,Articles.title,ArticleCate.name 
from Articles, Belong, ArticleCate
where Articles.articleId = Belong.articleId
and Belong.cateId = ArticleCate.cateId
and ArticleCate.name = 'study';

--Find out total number of articles and category name of each category.
select ArticleCate.name, count(ArticleCate.name) as numberOfArticle 
from Articles, Belong, ArticleCate
where Articles.articleId = Belong.articleId
and Belong.cateId = ArticleCate.cateId
group by ArticleCate.name
having numberOfArticle > 1;

--Find total of articles.
select count(*) from (select ArticleCate.name from Articles, Belong, ArticleCate
where Articles.articleId = Belong.articleId
and Belong.cateId = ArticleCate.cateId);

--Find out total number of articles and category name of each category and show information whether the number is greater than 10 or not.
select ArticleCate.name, numberOfArticle,
case 
    when numberOfArticle > 10 then 'The number Of Articles is greater than 10'
    when numberOfArticle = 10 then 'The number Of Articles  is 10'
    else 'The number Of Articles  is under 10'
end as numberOfArticleInfo from 
(select ArticleCate.name, count(ArticleCate.name) 
as numberOfArticle from Articles, Belong, ArticleCate
where Articles.articleId = Belong.articleId
and Belong.cateId = ArticleCate.cateId
group by ArticleCate.name
having numberOfArticle > 1);
### Relational Schema

Users (**<u>userId</u>**, userName, nickName, email, userPicture);

ArticleCate (**<u>cateId</u>**, name, alias, isDelete, <u>userId</u>)

Articles (**<u>articleId</u>**, title, content, coverImg, pubDate, status, isDelete, <u>userId</u>, <u>cateId</u>)

Belong (**<u>belongId</u>**, <u>cateId</u>, <u>articleId</u>)

(Notes: PK = **<u>PK</u>**; FK = <u>FK</u>)

### BCNF Proof

Each column of our database table is an indivisible basic data item, so it satisfies the first paradigm of BCNF.

There is no partial functional dependence of non-key fields on any candidate key in the database table, that is, all non-key fields are completely dependent on any set of candidate keys.

(userId) -> (userName, password, nickName, email, userPicture)

(cateId) -> (name, alias,isDelete. (FK) userId: NUMBER)

(articleId) -> (title, content, coverImg, pubDate, status, isDelete, (FK) userId)

In our data table, there is no transfer function dependence of non-key fields on any candidate key field, which conforms to the third normal form.

Within the scope of functional dependency, our data table has been completely separated, and the exception of insertion and deletion has been eliminated.

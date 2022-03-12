import { NextPage } from "next";
import NotFoundPage from "../../../components/ฺBlog/NotFoundPage";
import { Article } from "../../../interfaces/article";

const DeletedArticle: NextPage<{article: Article}> = (props) => {
    const article = props.article;
    if (article) return <DeletedArticlePage article={article} />;
    return <NotFoundPage />
}

export default DeletedArticle;
//--------------------------------//
import { GetServerSidePropsContext } from "next";
import { MongoClient } from "mongodb";
import { Lexer, Parser } from "marked";
import DeletedArticlePage from "../../../components/Admin/DeleteArticlePage";

export const getServerSideProps = async(context: GetServerSidePropsContext) => {
    // CONNECT DB AND COLLECTION
    const dbUrl = process.env.DB_URL as string;
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db("blogDB");
    const collection = db.collection("bin");

    // FIND THE ARTICLE AND CLOSE DB
    const slug = context.params!.slug;
    const articleNoTransformed = await collection.findOne({slug: slug});
    client.close();

    // IMMEDIATELY RETURN IF ARTICLE MATCHED TO SLUG IS NOT FOUND
    if (articleNoTransformed === null) return {props: {}};

    // TRANSFORM DATA
    const lexedMarkdown = Lexer.lex(articleNoTransformed.markdown);
    const parsedMarkdown = Parser.parse(lexedMarkdown);
    const transformedData: Article = {
        _id: articleNoTransformed!._id.toString(),
        title: articleNoTransformed.title,
        desc: articleNoTransformed.desc,
        markdown: parsedMarkdown,
        img: articleNoTransformed.img,
        alt: articleNoTransformed.alt,
        date: articleNoTransformed.date,
        category: articleNoTransformed.category,
        slug: articleNoTransformed.slug,
        views: articleNoTransformed.views? articleNoTransformed.views: 1
    };

    return {
        props:{
            article: transformedData
        }
    }
}
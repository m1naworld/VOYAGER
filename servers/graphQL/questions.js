import express from "express";
import {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { graphqlHTTP } from "express-graphql";
import { daily } from "../models/dailyQuestion";

const app = express();
const PORT = 2000;

const question = [
  {
    emotion: "happy",
    data: [
      { label: 1, Q: "맛있는거 먹었어?" },
      { label: 2, Q: "오늘 만난 사람들이 나 좋아하는거 같아" },
      { label: 3, Q: "지금 당장 떠오르는 신나는 노래있어?" },
      { label: 4, Q: "오늘 만족해?" },
      { label: 5, Q: "오늘 만족해?" },
    ],
  },
  {
    emotion: "sad",
    data: [
      { label: "1", Q: "와 나 오늘 너무 잘 참음!" },
      { label: "2", Q: "소주가 달다달아" },
      { label: "3", Q: "확신이 없어" },
      { label: "4", Q: "지금 내 고민이 그럴 가치가 없는거같아" },
      { label: "5", Q: "와 진짜 넘 바빠" },
    ],
  },
  {
    emotion: "joy",
    data: [
      { label: 1, Q: "오늘 한숨 쉰적 있어?" },
      { label: 2, Q: "아무것도 안하고 잠만 자고 싶다!" },
      { label: 3, Q: "이제 감정이 메말랐어" },
      { label: 4, Q: "오늘 부끄러운 일이 있었지" },
      { label: 5, Q: "다른 사람 챙기다가 나를 못챙겼네" },
    ],
  },
  {
    emotion: "anger",
    data: [
      { label: 1, Q: "내일이 안왔으면!!!!" },
      { label: 2, Q: "세상이 왜 나한테만 이러는지 모르겠네.." },
      { label: 3, Q: "내가 이 상황을 벗어날 수 없을거같아" },
      { label: 4, Q: "사람들 만나기 싫어?" },
      { label: 5, Q: "나 지금 살얼음판 걷는 느낌이야" },
    ],
  },
];

// data emotion 이라는 Object 만듬
// Query는 우리가 보내는 Query타입을 의미 => 정해진 타입으로 서버와 클라이언트끼리 통신
export const schema = buildSchema(`
  type datas {
    label: Int,
    Q: String
  }

  type emotions {
    emotion: String
    data: [datas]
  }

  type Query {
    questions: [emotions]

  }

  `);

// export const dailyquestion = buildSchema(`

// type question {
//   index: Int
//   qs: String
// }

// type datas {
//   label: Int
//   data: [question]
// }

// type dailys {
//   daily: [datas]
// }

// type Query {
//   show(label: label) : dailys
// }
// `);

// quetions(label: Int): dailys
//수정

export const root = {
  questions: () => {
    return question;
  },
};

// export const root = {
//   questions: () => {
//     return question.emotion;
//   },
// };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("success");
});

app.listen(PORT, () => console.log(`💫Server is runngin on ${PORT}`));

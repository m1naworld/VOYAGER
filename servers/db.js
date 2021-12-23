// env 파일읽기
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// 하나의 데이터 베이스 연결시 유효한 코드
mongoose.connect(process.env.DB_URL);

// mongoose의 connection 메소드를 변수 db에 할당
const mina = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};

const handleError = (error) => {
  console.log(`❌ Error on DB connection: ${error}`);
};

// db연결 성공 시 함수실행
mina.once("open", handleOpen);

mina.on("error", handleError);

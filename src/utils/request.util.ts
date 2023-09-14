import axios from 'axios';
import { Response } from 'express';

const requestForwarder = async (reqData: any) => {
  try {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        random_header: 'random_header',
      },
      withCredentials: true,
    };
    console.log('Calling request forwarder');
    return await axios.post(
      process.env.PROXY_URI as string,
      reqData,
      requestOptions,
    );
  } catch (err: any) {
    console.log('error in request forwarder: ', err);
    throw new Error(err);
  }
};

const sendAcknowledgement = (res: Response, ack: string) => {
  res.status(200).json({
    message: {
      ack: {
        status: ack,
      },
    },
  });
};

export { requestForwarder, sendAcknowledgement };

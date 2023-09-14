import { Request, Response } from 'express';
import { sendAcknowledgement } from '../../utils/request.util';
import { OnSearchDTO, SearchDTO } from './search.dto';
import {
  BPP_ID,
  BPP_URI,
  DSEP_DOMAIN,
  ON_SEARCH_ACTION,
  SEARCH_ACTION,
} from '../../constants';
import axios from 'axios';
import { createAuthorizationHeader } from '../../utils/auth.util';

export default async function searchController(req: Request, res: Response) {
  try {
    const searchDto: SearchDTO = req.body;

    console.log('Request body from the BPP SEARCH', searchDto);

    searchDto.context.domain = DSEP_DOMAIN;
    searchDto.context.action = SEARCH_ACTION;
    searchDto.context.bpp_id = BPP_ID;
    searchDto.context.bpp_uri = BPP_URI;

    console.log('searchDto', searchDto);

    console.log(
      'Making request to ',
      `${process.env.DELTA_PROVIDER_URI}/search`,
    );

    // const { data } = await axios.post(
    //   `${process.env.DELTA_PROVIDER_URI}/search` as string,
    //   searchDto,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // You might need additional headers
    //     },
    //   },
    // );

    const data = {
      name: 'Product Engineering',
      duration: '100weeks',
    };

    const searchResponse: OnSearchDTO = {
      context: searchDto?.context,
      message: {
        catalog: data as any,
      },
    };

    // console.log('search response: ', searchResponse);
    searchResponse.context.action = ON_SEARCH_ACTION;

    // const authHeader = await createAuthorizationHeader(searchResponse); // Assuming createAuthorizationHeader is imported or defined somewhere in the file
    // console.log('auth header: ', authHeader);

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        // authorization: authHeader,
      },
      withCredentials: true,
      // ... You might want to add more options here.
    };

    console.log(
      'calling request forwarder from bpp',
      `${searchDto.context.bap_uri}on_search`,
    );
    await axios.post(
      `${searchDto.context.bap_uri}on_search`,
      searchResponse,
      requestOptions,
    );

    sendAcknowledgement(res, 'ACK');
  } catch (err) {
    console.log('BPP ERRRRRRRRRRR %%%%%%%%', err);
    res.status(500).json({ error: 'Internal server error!' });
  }
}

import { Request, Response } from 'express';
import { sendAcknowledgement } from '../../utils/request.util';
import { SearchDTO } from './search.dto';
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

    searchDto.context.domain = DSEP_DOMAIN;
    searchDto.context.action = SEARCH_ACTION;
    searchDto.context.bpp_id = BPP_ID;
    searchDto.context.bpp_uri = BPP_URI;

    sendAcknowledgement(res, 'ACK');

    const { data: searchResponse } = await axios.post(
      `${process.env.DELTA_PROVIDER_URI}/search` as string,
      searchDto,
      {
        headers: {
          'Content-Type': 'application/json',
          // You might need additional headers
        },
      },
    );

    console.log('search response: ', searchResponse);
    searchResponse.context.action = ON_SEARCH_ACTION;

    const authHeader = await createAuthorizationHeader(searchResponse); // Assuming createAuthorizationHeader is imported or defined somewhere in the file
    console.log('auth header: ', authHeader);

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        authorization: authHeader,
      },
      withCredentials: true,
      // ... You might want to add more options here.
    };

    console.log('calling request forwarder');
    return await axios.post(
      `${searchDto.context.bap_uri}on_search`,
      searchResponse,
      requestOptions,
    );
  } catch (err) {
    res.status(500).json({ error: 'Internal server error!' });
  }
}

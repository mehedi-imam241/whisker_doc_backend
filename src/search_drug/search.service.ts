import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchResponse } from './dtos/search.response';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async search(query: string) {
    const { hits } = await this.esService.search<SearchResponse>({
      index: 'drugs',
      from: 0,
      query: {
        // multi_match: {
        //   query: query,
        //   fields: ['Drug'],
        // },
        prefix: {
          Drug: {
            value: query,
            case_insensitive: true,
          },
        },
      },
    });
    return hits.hits.map((drug) => drug._source);
  }

  async searchSymptomsTag(query: string) {
    const { hits } = await this.esService.search<SearchResponse>({
      index: 'symptoms1',
      from: 0,
      query: {
        // multi_match: {
        //   query: query,
        //   fields: ['Drug'],
        // },
        prefix: {
          Symptom: {
            value: query,
            case_insensitive: true,
          },
        },
      },
    });
    return hits.hits.map((symptom) => symptom._source);
  }
}

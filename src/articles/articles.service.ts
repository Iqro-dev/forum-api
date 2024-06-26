import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Article } from './schemas/article.schema';
import { CreateArticleDto, UpdateArticleDto } from './dtos/create-article.dto';

import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async getArticles() {
    return await this.articleModel.find();
  }

  async getArticle(id: string) {
    return await this.articleModel.findOne({ _id: id });
  }

  async createArticle(article: CreateArticleDto, user: User) {
    return await this.articleModel.create({
      authorID: user.id,
      ...article,
    });
  }

  async updateArticle(id: string, article: UpdateArticleDto) {
    return await this.articleModel.findByIdAndUpdate(id, article, {
      new: true,
    });
  }

  async deleteArticle(id: string) {
    return await this.articleModel.findByIdAndRemove(id);
  }
}

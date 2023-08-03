import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: any) {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().req);
    return ctx.getContext().req;
  }
}

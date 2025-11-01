import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator to extract the authenticated user or a specific property from the JWT payload.
 */
export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if (!data) {
            return user;
        }
        return user?.[data];
    },
);

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

/**
 * JWT Strategy for validating JWT tokens in incoming requests.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
        });
    }

    /**
     * Validates the JWT payload.
     *
     * @param payload The decoded JWT payload.
     * @returns An object containing the username if validation is successful.
     * @throws UnauthorizedException if the payload is invalid.
     */
    async validate(payload: any) {

        if (!payload || !payload.sub) {
            throw new UnauthorizedException('Invalid token payload');
        }
        return { username: payload.sub };
    }
}

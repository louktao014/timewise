"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_service_1 = require("./supabase.service");
let SupabaseModule = class SupabaseModule {
};
exports.SupabaseModule = SupabaseModule;
exports.SupabaseModule = SupabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'SUPABASE_CLIENT',
                useFactory: () => {
                    const supabaseUrl = process.env.SUPABASE_URL;
                    const supabaseKey = process.env.SUPABASE_KEY;
                    if (!supabaseUrl || !supabaseKey) {
                        throw new Error('Supabase URL and Key must be provided!');
                    }
                    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
                },
            },
            supabase_service_1.SupabaseService,
        ],
        exports: [supabase_service_1.SupabaseService],
    })
], SupabaseModule);
//# sourceMappingURL=supabase.module.js.map
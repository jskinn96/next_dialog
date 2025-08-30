import z from "zod";
import { ZodIssueCode } from "zod/v3";

export const cloudFormSchema = z.object({
    name: z.string().min(1, "계정명은 필수입니다"),
    cloudGroupName: z.array(z.string()).optional(),
    regionList: z.array(z.string())
                .min(1, "최소 1개 이상의 리전을 선택하세요")
                .refine(regions => regions.includes("global"), "리전 목록에는 반드시 '글로벌'이 포함되어야 합니다"),
    eventProcessEnabled: z.boolean(),
    userActivityEnabled: z.boolean(),
    scheduleScanEnabled: z.boolean(),
    scheduleScanSetting: z.object({
        frequency: z.string(),
        date: z.string(),
        weekday: z.string(),
        hour: z.string(),
        minute: z.string(),
    }),
    proxyUrl: z.string().optional(),
    provider: z.literal("AWS", "AWS만 선택 가능합니다"),
    credentials: z.object({
        accessKey: z.string().optional(),
        secretAccessKey: z.string().optional(),
        roleArn: z.string().optional(),
    }).optional(),
    credentialType: z.string().optional(),
    eventSource: z.object({
        cloudTrailName: z.string().optional(),
    }).optional(),
}).superRefine((data, ctx) => {

    // AWS일 때 옵션 스키마
    if (data.provider === "AWS") {

        // 자격 증명이 없을 때
        if (!data.credentials) {

            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "자격 증명은 필수입니다",
                path: ["credentials"],
            });

            return;
        }

        // credetials.accessKey 검증
        if (!data.credentials.accessKey || data.credentials.accessKey.length < 1) {

            ctx.addIssue({
                code: ZodIssueCode.custom,
                minimum: 1,
                message: "Access Key는 필수입니다",
                path: ["credentials", "accessKey"],
            });
        }

        // credentials.secretAccessKey 검증
        if (!data.credentials.secretAccessKey || data.credentials.secretAccessKey.length < 1) {
            
            ctx.addIssue({
                code: ZodIssueCode.custom,
                minimum: 1,
                message: "Secret Access Key는 필수입니다",
                path: ["credentials", "secretAccessKey"],
            });
        }

        // 자격 증명 타입 검증
        if (data.credentialType !== "ACCESS_KEY") {
            
            ctx.addIssue({
                code: ZodIssueCode.custom,
                expected: "ACCESS_KEY",
                message: "Access key만 선택 가능합니다",
                path: ["credentialType"],
            });
        }
    }
});

export type CloudFormData = z.infer<typeof cloudFormSchema>;
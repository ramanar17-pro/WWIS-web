import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const contact = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contact' }),
  schema: z.object({
    campusName: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.email(),
    mapUrl: z.url().optional(),
    officeHours: z.string().optional(),
    curriculumBoard: z.string(),
    language: z.string(),
    lastUpdated: z.coerce.date(),
  }),
});

const tuition = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tuition' }),
  schema: z
    .object({
      programName: z.string(),
      gradeRange: z.string(),
      annualFee: z.number().positive().optional(),
      feeRange: z.string().optional(),
      currency: z.string().default('INR'),
      additionalFees: z.array(z.string()).default([]),
      academicYear: z.string(),
      lastUpdated: z.coerce.date(),
    })
    .refine((data) => data.annualFee !== undefined || data.feeRange !== undefined, {
      message: 'Tuition entry must set either annualFee or feeRange (see PLANNING.md Dependencies).',
    }),
});

export const collections = { contact, tuition };

import type { AvatarEntryKind } from '@/lib/avatar-entries';
import { m } from '@/paraglide/messages.js';

export function avatarEntryCopy(kind: AvatarEntryKind) {
  return {
    icon: () => ({
      title: m['entry.icon.title'](),
      description: m['entry.icon.description'](),
      intro: m['entry.icon.intro'](),
      about_title: m['entry.icon.about_title'](),
      about1: m['entry.icon.about1'](),
      about2: m['entry.icon.about2'](),
      steps: [
        {
          title: m['entry.icon.step1_title'](),
          body: m['entry.icon.step1_body'](),
        },
        {
          title: m['entry.icon.step2_title'](),
          body: m['entry.icon.step2_body'](),
        },
        {
          title: m['entry.icon.step3_title'](),
          body: m['entry.icon.step3_body'](),
        },
      ],
      cases: [
        {
          title: m['entry.icon.case1_title'](),
          body: m['entry.icon.case1_body'](),
        },
        {
          title: m['entry.icon.case2_title'](),
          body: m['entry.icon.case2_body'](),
        },
        {
          title: m['entry.icon.case3_title'](),
          body: m['entry.icon.case3_body'](),
        },
      ],
      faqs: [
        {
          title: m['entry.icon.faq1_title'](),
          body: m['entry.icon.faq1_body'](),
        },
        {
          title: m['entry.icon.faq2_title'](),
          body: m['entry.icon.faq2_body'](),
        },
        {
          title: m['entry.icon.faq3_title'](),
          body: m['entry.icon.faq3_body'](),
        },
      ],
    }),
    pfp: () => ({
      title: m['entry.pfp.title'](),
      description: m['entry.pfp.description'](),
      intro: m['entry.pfp.intro'](),
      about_title: m['entry.pfp.about_title'](),
      about1: m['entry.pfp.about1'](),
      about2: m['entry.pfp.about2'](),
      steps: [
        {
          title: m['entry.pfp.step1_title'](),
          body: m['entry.pfp.step1_body'](),
        },
        {
          title: m['entry.pfp.step2_title'](),
          body: m['entry.pfp.step2_body'](),
        },
        {
          title: m['entry.pfp.step3_title'](),
          body: m['entry.pfp.step3_body'](),
        },
      ],
      cases: [
        {
          title: m['entry.pfp.case1_title'](),
          body: m['entry.pfp.case1_body'](),
        },
        {
          title: m['entry.pfp.case2_title'](),
          body: m['entry.pfp.case2_body'](),
        },
        {
          title: m['entry.pfp.case3_title'](),
          body: m['entry.pfp.case3_body'](),
        },
      ],
      faqs: [
        {
          title: m['entry.pfp.faq1_title'](),
          body: m['entry.pfp.faq1_body'](),
        },
        {
          title: m['entry.pfp.faq2_title'](),
          body: m['entry.pfp.faq2_body'](),
        },
        {
          title: m['entry.pfp.faq3_title'](),
          body: m['entry.pfp.faq3_body'](),
        },
      ],
    }),
    square: () => ({
      title: m['entry.square.title'](),
      description: m['entry.square.description'](),
      intro: m['entry.square.intro'](),
      about_title: m['entry.square.about_title'](),
      about1: m['entry.square.about1'](),
      about2: m['entry.square.about2'](),
      steps: [
        {
          title: m['entry.square.step1_title'](),
          body: m['entry.square.step1_body'](),
        },
        {
          title: m['entry.square.step2_title'](),
          body: m['entry.square.step2_body'](),
        },
        {
          title: m['entry.square.step3_title'](),
          body: m['entry.square.step3_body'](),
        },
      ],
      cases: [
        {
          title: m['entry.square.case1_title'](),
          body: m['entry.square.case1_body'](),
        },
        {
          title: m['entry.square.case2_title'](),
          body: m['entry.square.case2_body'](),
        },
        {
          title: m['entry.square.case3_title'](),
          body: m['entry.square.case3_body'](),
        },
      ],
      faqs: [
        {
          title: m['entry.square.faq1_title'](),
          body: m['entry.square.faq1_body'](),
        },
        {
          title: m['entry.square.faq2_title'](),
          body: m['entry.square.faq2_body'](),
        },
        {
          title: m['entry.square.faq3_title'](),
          body: m['entry.square.faq3_body'](),
        },
      ],
    }),
    random: () => ({
      title: m['entry.random.title'](),
      description: m['entry.random.description'](),
      intro: m['entry.random.intro'](),
      about_title: m['entry.random.about_title'](),
      about1: m['entry.random.about1'](),
      about2: m['entry.random.about2'](),
      steps: [
        {
          title: m['entry.random.step1_title'](),
          body: m['entry.random.step1_body'](),
        },
        {
          title: m['entry.random.step2_title'](),
          body: m['entry.random.step2_body'](),
        },
        {
          title: m['entry.random.step3_title'](),
          body: m['entry.random.step3_body'](),
        },
      ],
      cases: [
        {
          title: m['entry.random.case1_title'](),
          body: m['entry.random.case1_body'](),
        },
        {
          title: m['entry.random.case2_title'](),
          body: m['entry.random.case2_body'](),
        },
        {
          title: m['entry.random.case3_title'](),
          body: m['entry.random.case3_body'](),
        },
      ],
      faqs: [
        {
          title: m['entry.random.faq1_title'](),
          body: m['entry.random.faq1_body'](),
        },
        {
          title: m['entry.random.faq2_title'](),
          body: m['entry.random.faq2_body'](),
        },
        {
          title: m['entry.random.faq3_title'](),
          body: m['entry.random.faq3_body'](),
        },
      ],
    }),
    pixel: () => ({
      title: m['entry.pixel.title'](),
      description: m['entry.pixel.description'](),
      intro: m['entry.pixel.intro'](),
      about_title: m['entry.pixel.about_title'](),
      about1: m['entry.pixel.about1'](),
      about2: m['entry.pixel.about2'](),
      steps: [
        {
          title: m['entry.pixel.step1_title'](),
          body: m['entry.pixel.step1_body'](),
        },
        {
          title: m['entry.pixel.step2_title'](),
          body: m['entry.pixel.step2_body'](),
        },
        {
          title: m['entry.pixel.step3_title'](),
          body: m['entry.pixel.step3_body'](),
        },
      ],
      cases: [
        {
          title: m['entry.pixel.case1_title'](),
          body: m['entry.pixel.case1_body'](),
        },
        {
          title: m['entry.pixel.case2_title'](),
          body: m['entry.pixel.case2_body'](),
        },
        {
          title: m['entry.pixel.case3_title'](),
          body: m['entry.pixel.case3_body'](),
        },
      ],
      faqs: [
        {
          title: m['entry.pixel.faq1_title'](),
          body: m['entry.pixel.faq1_body'](),
        },
        {
          title: m['entry.pixel.faq2_title'](),
          body: m['entry.pixel.faq2_body'](),
        },
        {
          title: m['entry.pixel.faq3_title'](),
          body: m['entry.pixel.faq3_body'](),
        },
      ],
    }),
  }[kind]();
}

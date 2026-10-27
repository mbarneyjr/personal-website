import { css, type Handle, ref } from 'remix/component';
import { routes } from '../../routes.ts';
import { border, color, layout, space, text } from './styles.ts';
import { theme } from './theme.ts';

interface Command {
  keys: string;
  description: string;
  run(count: number, help: HTMLDialogElement): void;
}

const lineHeight = 60;
const sequenceTimeout = 1000;
const editable = 'input, select, textarea, [contenteditable]';

function visit(href: string) {
  location.assign(href);
}

function follow(rel: string) {
  document.querySelector<HTMLAnchorElement>(`a[rel~="${rel}"]`)?.click();
}

function jumpToHeading(direction: 1 | -1, count: number) {
  const headings = [...document.querySelectorAll('main h2')];
  const ahead =
    direction === 1
      ? headings.filter((heading) => heading.getBoundingClientRect().top > 1)
      : headings.filter((heading) => heading.getBoundingClientRect().top < -1).reverse();
  ahead[Math.min(count, ahead.length) - 1]?.scrollIntoView();
}

const commands: Command[] = [
  { keys: 'j', description: 'scroll down', run: (count) => scrollBy({ top: count * lineHeight }) },
  { keys: 'k', description: 'scroll up', run: (count) => scrollBy({ top: -count * lineHeight }) },
  { keys: 'd', description: 'scroll down half a page', run: (count) => scrollBy({ top: (count * innerHeight) / 2 }) },
  { keys: 'u', description: 'scroll up half a page', run: (count) => scrollBy({ top: (-count * innerHeight) / 2 }) },
  { keys: 'gg', description: 'go to top', run: () => scrollTo({ top: 0 }) },
  { keys: 'G', description: 'go to bottom', run: () => scrollTo({ top: document.documentElement.scrollHeight }) },
  { keys: '}', description: 'next section', run: (count) => jumpToHeading(1, count) },
  { keys: '{', description: 'previous section', run: (count) => jumpToHeading(-1, count) },
  { keys: ']]', description: 'next page', run: () => follow('next') },
  { keys: '[[', description: 'previous page', run: () => follow('prev') },
  { keys: 'H', description: 'history back', run: () => history.back() },
  { keys: 'L', description: 'history forward', run: () => history.forward() },
  { keys: 'gh', description: 'go to home', run: () => visit(routes.home.href()) },
  { keys: 'gb', description: 'go to blog', run: () => visit(routes.blog.index.href()) },
  { keys: 'gr', description: 'go to resume', run: () => visit(routes.resume.href()) },
  {
    keys: 'gc',
    description: 'go to cloudformation changelog',
    run: () => visit(routes.apps.cloudformationChangelog.index.href()),
  },
  { keys: 't', description: 'cycle color theme', run: () => theme.cycle() },
  { keys: '?', description: 'toggle this help', run: (_, help) => (help.open ? help.close() : help.showModal()) },
];

class KeyboardCommands {
  #help: HTMLDialogElement;
  #pending = '';
  #count = '';
  #timer?: ReturnType<typeof setTimeout>;

  constructor(help: HTMLDialogElement) {
    this.#help = help;
  }

  handleEvent(event: KeyboardEvent) {
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
    if (event.target instanceof Element && event.target.closest(editable)) return;

    if (!this.#pending && /\d/.test(event.key) && (this.#count || event.key !== '0')) {
      this.#count += event.key;
      this.#arm();
      return;
    }

    const keys = this.#pending + event.key;
    const command = commands.find((candidate) => candidate.keys === keys);
    if (command) {
      event.preventDefault();
      command.run(Number(this.#count || 1), this.#help);
      this.#reset();
    } else if (commands.some((candidate) => candidate.keys.startsWith(keys))) {
      event.preventDefault();
      this.#pending = keys;
      this.#arm();
    } else {
      this.#reset();
    }
  }

  #arm() {
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => this.#reset(), sequenceTimeout);
  }

  #reset() {
    clearTimeout(this.#timer);
    this.#pending = '';
    this.#count = '';
  }
}

const dialogStyle = css({ margin: 'auto' });

export function KeyboardControl(_handle: Handle) {
  return () => (
    <dialog
      aria-label="Keyboard commands"
      closedby="any"
      mix={[
        dialogStyle,
        border.allStrong,
        color.bg,
        color.fg,
        space.pad4,
        ref((help, signal) => document.addEventListener('keydown', new KeyboardCommands(help), { signal })),
      ]}
    >
      <div mix={[layout.stack, space.gap3]}>
        <h2 mix={[text.heading, border.ruleSolid]}>Keyboard</h2>
        <dl mix={[layout.inventory, space.rowGap1]}>
          {commands.flatMap((command) => [
            <dt key={`${command.keys}-keys`} mix={[text.bold, color.accent1]}>
              <kbd>{command.keys}</kbd>
            </dt>,
            <dd key={`${command.keys}-description`}>{command.description}</dd>,
          ])}
        </dl>
        <p mix={[text.small, color.muted]}>Prefix a motion with a count, such as 5j.</p>
      </div>
    </dialog>
  );
}

<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}

	/** This is where you can register custom post types. */
	public function register_post_types() {
	}

	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {
	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );

		add_theme_support( 'editor-styles' );
		add_theme_support( 'dark-editor-style' );
		add_editor_style( 'style-editor.css' );

		function register_acf_block_types() {
			acf_register_block_type(array(
				'name'              => 'text',
				'title'             => __('Text'),
				'description'       => __('A custom text block.'),
				'render_callback'		=> 'my_acf_block_render_callback',
				'category'          => 'core',
				'icon'              => 'admin-comments'
			));

			acf_register_block_type(array(
				'name'              => 'custom-video',
				'title'             => __('Video'),
				'description'       => __('A custom video block.'),
				'render_callback'		=> 'my_acf_block_render_callback',
				'category'          => 'core',
				'icon'              => 'admin-comments'
			));

			acf_register_block_type(array(
				'name'              => 'slides',
				'title'             => __('Slides'),
				'description'       => __('A custom slides block.'),
				'render_callback'		=> 'my_acf_block_render_callback',
				'category'          => 'core',
				'icon'              => 'admin-comments'
			));

			acf_register_block_type(array(
				'name'              => 'product',
				'title'             => __('Product'),
				'description'       => __('A custom product block.'),
				'render_callback'		=> 'my_acf_block_render_callback',
				'category'          => 'core',
				'icon'              => 'admin-comments'
			));

			acf_register_block_type(array(
				'name'              => 'rows',
				'title'             => __('Rows'),
				'description'       => __('A custom rows block.'),
				'render_callback'		=> 'my_acf_block_render_callback',
				'category'          => 'core',
				'icon'              => 'admin-comments'
			));
		}

		// Check if function exists and hook into setup.
		if ( function_exists('acf_register_block_type') ) {
			add_action('acf/init', 'register_acf_block_types');
		}

		function my_acf_block_render_callback( $block, $content = '', $is_preview = false ) {
			$context = Timber::context();
			$context['block'] = $block;
			$context['fields'] = get_fields();
			$context['is_preview'] = $is_preview;
			$slug = str_replace('acf/', '', $block['name']);
			$context['align_class'] = $block['align'] ? 'u-text--' . $block['align'] : '';

			Timber::render("templates/blocks/block-{$slug}.twig", $context );
		}

		add_filter('allowed_block_types', 'missoni_allowed_block_types', 10, 2);
		function missoni_allowed_block_types($allowed_blocks, $post) {
			$allowed_blocks = [];

			if ($post->post_type === 'page') {
				$allowed_blocks = array(
					'acf/text',
					'acf/slides',
					'acf/rows',
					'acf/custom-video',
					'acf/product'
				);
			}

			return $allowed_blocks;
		}

		wp_register_script('application', get_template_directory_uri() . '/dist/application.js', array(), null, true );
		wp_enqueue_script('application');


		add_action('admin_menu', 'remove_options');
		function remove_options() {
				remove_menu_page( 'edit.php' );
				remove_menu_page( 'edit-comments.php' );
		}
	}

	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

new StarterSite();
